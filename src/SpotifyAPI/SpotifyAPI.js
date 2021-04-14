export let accessToken;
export let accessGranted = false;
// const redirectURI = "http://localhost:3000";
const redirectURI = "https://adoring-poincare-260fd4.netlify.app";
const clientID = "b024338c43684855872f5a74ae11197a";

export const Spotify = {
    getAccessToken() {
        if(accessToken) {
            accessGranted = true;
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&scope=streaming%20user-read-email%20user-read-private%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public`;
            window.location = accessURL;
        }
    }
}

export async function search(term) {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
                        { headers: { Authorization: `Bearer ${accessToken}` } });
    const jsonResponse = await response.json();
    if(!jsonResponse.tracks) {
        return []; 
    } 
    return jsonResponse.tracks.items.map(track => {
        return ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        image: track.album.images[0].url,
        preview: track.preview_url
    })});
}

export async function getID() {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/me', {headers: {Authorization: `Bearer ${accessToken}`}});
    const jsonResponse = await response.json();
    return jsonResponse.id;
}

export async function getUserProfile() {
    const accessToken = Spotify.getAccessToken();
    const user_id = await getID();
    const response = await fetch(`https://api.spotify.com/v1/users/${user_id}`, {headers: {Authorization: `Bearer ${accessToken}`}});
    const jsonResponse = await response.json();
    return {
        display_name: jsonResponse.display_name, 
        image: jsonResponse.images[0].url    
    }
}

export async function getPlaylistsList() {
    const accessToken = Spotify.getAccessToken();
    const user_id = await getID();
    const response = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {headers: {Authorization: `Bearer ${accessToken}`}});
    const jsonResponse = await response.json();
    return jsonResponse.items.map(playlist => {
        return {
            name: playlist.name,
            id: playlist.id
        };
    });
}

export async function getPlaylist(playlist_id) {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {headers: {Authorization: `Bearer ${accessToken}`}});
    const jsonResponse = await response.json();
    return {
        name: jsonResponse.name,
        image: jsonResponse.images[0].url,
        songs: jsonResponse.tracks.items.map((song, index) => {
            return {
                index: index + 1,
                duration: song.track.duration_ms,
                id: song.track.id,
                name: song.track.name,
                uri: song.track.uri,
                artist: song.track.artists[0].name,
                image: song.track.album.images[0].url,
                album: song.track.album.name
            }
        })
    };
}

export async function getNewRelease() {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/browse/new-releases?limit=8&country=PH', {headers: {Authorization: `Bearer ${accessToken}`}});
    const jsonResponse = await response.json();
    return jsonResponse.albums.items.map(item => {
        return {
            name: item.name,
            artists: item.artists[0].name,
            id: item.id,
            images: item.images[0].url,
            uri: item.uri
        }
    });
};

export async function savePlaylist(name, trackURIs) {
    const accessToken = Spotify.getAccessToken();
    const user_id = await getID();
    const responseName = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        headers: {Authorization: `Bearer ${accessToken}`},
        method: 'POST',
        body: JSON.stringify({name: name}) 
    })
    const jsonResponsePlaylistId = await responseName.json();
    const playlistId = jsonResponsePlaylistId.id;
    
    await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlistId}/tracks`, {
                        headers: {Authorization: `Bearer ${accessToken}`},
                        method: 'POST',
                        body: JSON.stringify({uris: trackURIs})
    });

}   

export async function getCategories() {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/browse/categories?limit=8&country=PH', {headers: {Authorization: `Bearer ${accessToken}`}});
    const jsonResponse = await response.json();
    return jsonResponse.categories.items.map(item => {
        return {
            id: item.id,
            name: item.name
        }
    });
}

export async function getCategoryPlaylist(category_id) {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/browse/categories/${category_id}/playlists?limit=5&country=PH`, {headers: {Authorization: `Bearer ${accessToken}`}});
    const jsonResponse = await response.json();
    return jsonResponse.playlists.items.map(item => {
        return {
            name: item.name,
            images: item.images[0].url,
            id: item.id
        }
    });
}
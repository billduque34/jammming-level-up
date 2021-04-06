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
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&scope=streaming%20user-read-email%20user-read-private%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
            window.location = accessURL;
        }
    }
}

export async function search(term) {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
                        { headers: { Authorization: `Bearer ${accessToken}` } });
    const jsonResponse = await response.json();
    console.log(`https://api.spotify.com/v1/search?type=track&q=${term}`);
    if(!jsonResponse.tracks) {
        return []; 
    } 
    return jsonResponse.tracks.items.map(track => {
        console.log(track);
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
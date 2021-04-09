import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreatePlaylist } from '../../features/createPlaylist/CreatePlaylist';
import { PlaylistSongSearch } from '../../features/playlistSongSearch/PlaylistSongSearch';
import { savePlaylist } from '../../SpotifyAPI/SpotifyAPI';
import { fetchPlaylistsList } from '../../features/playlistsLIst/playlistsListSlice';
import './CreatePlaylistPage.css';

export function CreatePlaylistPage(props) {
    const [playlistList, setPlaylistList] = useState([]);
    const [playlistName, setPlaylistName] =useState('');
    const dispatch = useDispatch();

    const createPlaylist = () => {
        if(playlistList && playlistName) {
            savePlaylist(playlistName, playlistList.map(track => track.uri)).then(res => {
                    console.log('Run! Hard!');
                    dispatch(fetchPlaylistsList());
            });
            setPlaylistName('');
            setPlaylistList([]);
        } else {
            alert('Playlist Name or Playlist List is empty!');
        }
    }

    return (<div className="CreatePlaylistPage">
                <div className="add-playlist">
                    <h2>Create a Playlist</h2>
                    <button onClick={createPlaylist}>CREATE PLAYLIST</button>
                </div>
                <div className="playlist-creator">
                    <PlaylistSongSearch setPlaylistList={setPlaylistList} setPlayPreview={props.setPlayPreview} playPreview={props.playPreview}/>
                    <CreatePlaylist playlistList={playlistList} setPlaylistList={setPlaylistList} setPlaylistName={setPlaylistName} playlistName={playlistName}/>
                </div>
            </div>);
}
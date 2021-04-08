import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaylist } from '../playlist/playlistSlice';
import { Link } from 'react-router-dom';
import './PlaylistsList.css';
import { fetchPlaylistsList, selectPlaylistsList } from './playlistsListSlice';

export function PlaylistsList() {
    const [playlistID, setPlaylistID] = useState('');

    const playlistsList = useSelector(selectPlaylistsList);
    const dispatch = useDispatch('');

    useEffect(() => {
        dispatch(fetchPlaylistsList());
    }, [dispatch]);

    useEffect(() => {
        if(playlistID) {
            dispatch(fetchPlaylist(playlistID));
        }
    }, [dispatch,playlistID]);

    return (<div className="PlaylistsList">
                {playlistsList.map(playlist => {
                 return (<Link to={`/playlist/${playlist.id}`} key={playlist.id}>
                            <p onClick={() => {setPlaylistID(playlist.id)}}>{playlist.name}</p>
                        </Link>)
                })}
            </div>);
}
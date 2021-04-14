import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './PlaylistsList.css';
import { fetchPlaylistsList, selectPlaylistsList } from './playlistsListSlice';

export function PlaylistsList(props) {
    const playlistsList = useSelector(selectPlaylistsList);
    const dispatch = useDispatch('');

    useEffect(() => {
        dispatch(fetchPlaylistsList());
    }, [dispatch]);

    return (<div className="PlaylistsList">
                {playlistsList.map(playlist => {
                 return (<Link to={`/playlist/${playlist.id}`} key={playlist.id}>
                            <p onClick={() => {props.setPlaylistID(playlist.id)}}>{playlist.name}</p>
                        </Link>)
                })}
            </div>);
}
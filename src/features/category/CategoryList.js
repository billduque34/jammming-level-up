import { useEffect, useState } from 'react';
import { getCategoryPlaylist } from '../../SpotifyAPI/SpotifyAPI';
import './CategoryList.css';
import { CategorySong } from './CategorySong/CategorySong';

export function CategoryList(props) {
    const [categoryPlaylists, setcategoryPlaylists] = useState([]);

    useEffect(() => {
        getCategoryPlaylist(props.id).then(res => setcategoryPlaylists(res));
    }, [props.id]);

    return (<div className="CategoryList">
                <div className ="category-name">
                    <h2>{props.name}</h2>
                </div>
                <div className="category-songs-container">
                    <div className="category-songs-list">
                        {categoryPlaylists.map(playlist => <CategorySong image={playlist.images} 
                                                                         name={playlist.name}
                                                                         id={playlist.id}
                                                                         key={playlist.id}
                                                                         setPlaylistID={props.setPlaylistID}/>)}
                    </div>
                </div>
            </div>)
}
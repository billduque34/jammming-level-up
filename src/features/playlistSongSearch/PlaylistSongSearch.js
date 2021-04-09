import { useEffect, useState } from 'react';
import { CreatePlaylistCard } from '../../components/CreatePlaylistPage/CreatePlaylistCard/CreatePlaylistCard';
import { search } from '../../SpotifyAPI/SpotifyAPI';
import './PlaylistSongSearch.css';

export function PlaylistSongSearch(props) {
    const [searchSong, setSearchSong] = useState('');
    const [searchList, setSearchList] = useState([]);

    const handleClick = ({target}) => {
        setSearchSong(target.value);
    }

    useEffect(() => {
        search(searchSong).then(res => setSearchList(res));
    }, [searchSong]);

    return (<div className="PlaylistSongSearch">
                <input type="text" placeholder="Search you favorite song" onChange={handleClick} value={searchSong}/>
                <div className="search-list">
                    {searchList.map(track => <CreatePlaylistCard track={track}
                                                                 setPlaylistList={props.setPlaylistList}  
                                                                 isSearch={true} 
                                                                 key={track.id}
                                                                 setPlayPreview={props.setPlayPreview} 
                                                                 playPreview={props.playPreview}                                
                    />)}
                </div>
            </div>)
}
import { Link } from 'react-router-dom';
import './CategorySong.css';

export function CategorySong(props) {
    return (<div className="CategorySong">
                <Link to={`/playlist/${props.id}`} key={props.id}>
                <div className="song-inner" onClick={() => props.setPlaylistID(props.id)}>
                    <div className="song-front">
                        <img src={props.image} alt=""/>
                    </div>
                    <div className="song-back">
                        <p>{props.name}</p>
                        <p>Playlist</p>
                    </div>
                </div>
                </Link>
            </div>);
}
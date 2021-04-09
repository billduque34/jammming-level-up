import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import './PlaylistPage.css';
import { selectPlaylist } from './playlistSlice';
import { Song } from './Song/Song';

export function PlaylistPage(props) {
    const playlist = useSelector(selectPlaylist);

    return (<div className= "PlaylistPage">
                <div className="playlist-title">
                    <img src={playlist.image} alt=""/>
                    <div className="playlist-name">
                        <p>PLAYLIST</p>
                        <h1>{playlist.name}</h1>
                    </div>
                </div>
                <div className="song-list">
                    <div className="song-label">
                        <p>#</p>
                        <p>TITLE</p>
                        <p>ALBUM</p>
                        <FontAwesomeIcon icon={faClock}/>
                    </div>
                    <div className="songs">
                        {   Object.keys(playlist).length !== 0  ? playlist.songs.map(song => <Song name={song.name} artists={song.artist} image={song.image} key={song.id}
                            duration={song.duration} number={song.index} album={song.album} uri={song.uri} setCurrentUri={props.setCurrentUri}/>) : ''}
                    </div>
                </div>
            </div>);
}
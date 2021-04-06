import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SongCard.css';

export function SongCard({name, artist, uri, album, image, setCurrentUri, preview, setPlayPreview}) {
    return (<div className="SongCard">
                <div className="card-inner">
                <div className="song-front-card">
                        <img src={image} alt=""/>
                        <div className="artist-info">
                            <p>{name}</p>
                            <p>{artist}</p>
                            <p>{album}</p>
                        </div>
                    </div>
                    <div className="song-back-card">
                        <div className="play-full" onClick={() => setCurrentUri(uri)}>
                            <FontAwesomeIcon icon={faPlay}/>
                            <p>Play</p>
                        </div>
                        <div className="play-preview" onClick={() => setPlayPreview(preview)}>
                            <FontAwesomeIcon icon={faPlay}/>
                            <p>Play Preview</p>
                        </div>
                    </div>
                </div>
            </div>);
}
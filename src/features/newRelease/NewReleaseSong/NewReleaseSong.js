import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NewReleaseSong.css';

export function NewReleaseSong(props) {
    return (<div className="NewReleaseSong">
                <div className="new-release-inner">
                    <div className="front-new-release">
                        <img src={props.images} alt=""/>
                        <div className="song-label">
                            <p>{props.name}</p>
                            <p>{props.artists}</p>
                        </div>
                    </div>
                    <div className="back-new-release">
                        <div className="play-full" onClick={() => props.setCurrentUri(props.uri)}>
                            <FontAwesomeIcon icon={faPlay}/>
                            <p>Play</p>
                        </div>
                    </div>
                </div>
            </div>);
}
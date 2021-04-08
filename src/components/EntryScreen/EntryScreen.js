import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './EntryScreen.css';

export function EntryScreen(props) {
    return (<div className="EntryScreen">
                <div className="pop-up-authentication">
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    <p>Click Enter Now to authenticate then click 
                    Enter Now again to Enter.</p>
                </div>
                <div className="entry-section">
                    <div className="app-title">
                        <p>Ja<span>mmm</span>ing</p>
                        <p>Playlist Creator</p>
                    </div>
                    <button onClick={props.onClick}>Enter Now</button>
                </div>
            </div>);
}
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CreatePlaylistCard.css';

export function CreatePlaylistCard({track, setPlaylistList, isSearch, setPlayPreview, playPreview}) {
    const removeTrack = () => {
        setPlaylistList(prevState => prevState.filter(el => {
            console.log(el.id);
            return el.id !== track.id;
        }))
    }

    const addTrack = () => {
        setPlaylistList(prevState => {
            if(prevState.every(el => el.id !== track.id)) {
                return [track, ...prevState];
            }
            return prevState;
        })
    }

    const buttonCard = (searchCard) => {
        if(!searchCard) {
            return <button onClick={removeTrack}><FontAwesomeIcon icon={faMinus}/></button>
        }
        return <button onClick={addTrack}><FontAwesomeIcon icon={faPlus}/></button>
    }
    console.log(track.preview);
    return (<div className="CreatePlaylistCard">
                <div className="track">
                    <div className="track-img">
                        <img src={track.image} alt="" onClick={() => {playPreview !== track.preview ? setPlayPreview(track.preview) : setPlayPreview('')}}/>
                    </div>
                    <div className="track-desc">
                        <p>{track.name}</p>
                        <p>{`${track.artist} | ${track.album}`}</p>
                    </div>
                </div>
                {buttonCard(isSearch)}
            </div>)
}
import './Song.css';

export function Song(props) {

    const convertDuration = (ms) => {
        let min = Math.floor((ms/1000/60) << 0);
        let sec = Math.floor((ms/1000) % 60);
        
        return `${min}:${sec <= 9 ? ("0" + sec) : sec }`;
    };

    return (<div className="Song">
                <p>{props.number}</p>
                <div className="song-name">
                    <img src={props.image} alt=""/>
                    <div className="song-name-artist">
                        <p>{props.name}</p>
                        <p>{props.artists}</p>
                    </div>    
                </div>
                <p>{props.album}</p>
                <p>{convertDuration(props.duration)}</p>
            </div>);
}
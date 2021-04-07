import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback/lib';
import { Spotify } from '../../SpotifyAPI/SpotifyAPI';
import { PreviewPlayback } from '../PreviewPlayback/PreviewPlayback';
import { SearchPage } from '../SearchPage/SearchPage';
import './MainScreen.css';

export function MainScreen() {
    const [currentUri, setCurrentUri] = useState('');
    const [play, setPlay] = useState(false);
    const [playPreview, setPlayPreview] = useState('');



    useEffect(() => setPlay(true), [currentUri]);

    useEffect(() => {
        if(play) {
            setPlayPreview('');
        }
    }, [playPreview, play]);

    return (<div className="main-screen">
                <div className="MainScreen">
                    <header>
                        <p>Ja<span>mmm</span>ing</p>
                        <nav>
                            <div className="button">
                                <FontAwesomeIcon icon={faHome}/>
                                <p>Home</p>
                            </div>
                            <div className="button">
                                <FontAwesomeIcon icon={faSearch}/>  
                                <p>Search</p>
                            </div>
                        </nav>
                    </header>
                    <main>
                        <SearchPage setPlayPreview={setPlayPreview} setCurrentUri={setCurrentUri}/>
                    </main>
                </div>
                {playPreview ? <PreviewPlayback playPreview={playPreview}/> : ''}
                <SpotifyWebPlayer token={Spotify.getAccessToken()}
                    callback={state => {
                        if(!state.isPlaying) {
                            setPlay(false);
                        } else {
                            setPlay(true);
                        }
                    }}
                    play={play}
                    uris={[currentUri]}
                    styles={{activeColor: '',
                    bgColor: 'rgba(34, 0, 97,0.4)',
                    color: '#fff',
                    loaderColor: '#fff',
                    sliderColor: '#1cb954',
                    trackArtistColor: '#ccc',
                    trackNameColor: '#fff',
                    height: '100px'}}/>
            </div>);
}
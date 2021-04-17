import { faHome, faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback/lib';
import { AccountName } from '../../features/accountName/AccountName';
import { PlaylistPage } from '../../features/playlist/PlaylistPage';
import { PlaylistsList } from '../../features/playlistsLIst/PlaylistsList';
import { getPremium, Spotify } from '../../SpotifyAPI/SpotifyAPI';
import { HomePage } from '../HomePage/HomePage';
import { PreviewPlayback } from '../PreviewPlayback/PreviewPlayback';
import { SearchPage } from '../SearchPage/SearchPage';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './MainScreen.css';
import { CreatePlaylistPage } from '../CreatePlaylistPage/CreatePlaylistPage';
import { useDispatch } from 'react-redux';
import { fetchPlaylist } from '../../features/playlist/playlistSlice';

export function MainScreen() {
    const [premium, setPremium] = useState('');
    const [currentUri, setCurrentUri] = useState('');
    const [play, setPlay] = useState(false);
    const [playPreview, setPlayPreview] = useState('');

    const [playlistID, setPlaylistID] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        getPremium().then(res => setPremium(res));
    }, []);


    useEffect(() => {
        if(playlistID) {
            dispatch(fetchPlaylist(playlistID));
        }
    }, [dispatch,playlistID]);

    useEffect(() => {
        if(premium === 'premium') {
            setPlay(true);
        }
    }, [currentUri,premium]);

    useEffect(() => {
        if(play) {
            setPlayPreview('');
        }
    }, [playPreview, play]);

    return (<div className="main-screen">
                <div className="MainScreen">
                <Router>
                    <header>
                        <p>Ja<span>mmm</span>ing</p>
                        <nav>
                            <Link to="/">
                                <div className="button">
                                    <FontAwesomeIcon icon={faHome}/>
                                    <p>Home</p>
                                </div>
                            </Link>
                            <Link to="/search">
                                <div className="button">
                                    <FontAwesomeIcon icon={faSearch}/>  
                                    <p>Search</p>
                                </div>
                            </Link>
                            <Link to="/createPlaylist">
                                <div className="button">
                                    <FontAwesomeIcon icon={faPlusSquare}/>  
                                    <p>Create Playlist</p>
                                </div>
                            </Link>
                        </nav>
                        <PlaylistsList setPlaylistID={setPlaylistID}/>
                    </header>
                    <main>
                            <AccountName/>
                            <Switch>
                                <Route exact path="/">
                                    <HomePage setCurrentUri={setCurrentUri} setPlaylistID={setPlaylistID}/>
                                </Route>
                                <Route path="/search">
                                    <SearchPage setPlayPreview={setPlayPreview} setCurrentUri={setCurrentUri}/>
                                </Route>
                                <Route path="/playlist/:id">
                                    <PlaylistPage setCurrentUri={setCurrentUri}/>
                                </Route>
                                <Route path="/createPlaylist">
                                    <CreatePlaylistPage setPlayPreview={setPlayPreview} playPreview={playPreview}/>
                                </Route>
                            </Switch>
                    </main>
                </Router>
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
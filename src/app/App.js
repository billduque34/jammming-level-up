import { useState } from 'react';
import { EntryScreen } from '../components/EntryScreen/EntryScreen';
import { MainScreen } from '../components/MainScreen/MainScreen';
import { Spotify } from '../SpotifyAPI/SpotifyAPI';

import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState('');

  const accessTokenClick = () => {
    setAccessToken(Spotify.getAccessToken());
  }

  return (
    <div className="App">
      {accessToken ? <MainScreen/> : 
        <EntryScreen accessToken={accessToken} onClick={accessTokenClick}/>}
    </div>
  );
}

export default App;

import { useSelector } from 'react-redux';
import { selectSearch } from '../../features/search/searchSlice';
import { SongCard } from '../SongCard/SongCard';
import './SearchResults.css';

export function SearchResults({setCurrentUri, setPlayPreview}) {
    const tracks = useSelector(selectSearch);
    return (<div className="SearchResults">
                <p>Search Results</p>
                <div className="song-list">
                    {tracks.map(track => <SongCard name={track.name} artist={track.artist} key={track.id}
                        uri={track.uri} album={track.album} image={track.image} setCurrentUri={setCurrentUri}
                        preview={track.preview} setPlayPreview={setPlayPreview}/>)}
                </div>
            </div>);
}
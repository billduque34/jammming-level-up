import { useSelector } from 'react-redux';
import { selectSearch } from '../../features/search/searchSlice';
import { SongCard } from '../SongCard/SongCard';
import './SearchResults.css';
import { LoadingBar } from '../LoadingBar/LoadingBar';

export function SearchResults({setCurrentUri, setPlayPreview}) {
    const tracks = useSelector(selectSearch);
    const isLoading = useSelector(state => state.search.isLoadingSearch);

    return (<div className="SearchResults">
                {isLoading ? '' : <p>{tracks.length !== 0 ? 'Search Results' :'Search your desired song or artist!'}</p>}
                {isLoading ? <LoadingBar/> : <div className="song-list">
                    {tracks.map(track => <SongCard name={track.name} artist={track.artist} key={track.id}
                        uri={track.uri} album={track.album} image={track.image} setCurrentUri={setCurrentUri}
                        preview={track.preview} setPlayPreview={setPlayPreview}/>)}
                </div>}
            </div>);
}
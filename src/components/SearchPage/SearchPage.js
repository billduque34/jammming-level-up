import { SearchBar } from '../../features/search/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import './SearchPage.css';

export function SearchPage({setCurrentUri, setPlayPreview}) {
    return (<div className="SearchPage">
                <div className="search-header">
                    <SearchBar/>
                </div>
                <main>
                    <SearchResults setPlayPreview={setPlayPreview} setCurrentUri={setCurrentUri}/>
                </main>
            </div>);
}
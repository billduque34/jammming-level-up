import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import './SearchBar.css';
import { fetchSearch } from './searchSlice';

export function SearchBar() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const inputSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleClick = () => {
        dispatch(fetchSearch(search));
        setSearch('');
    }

    return (<div className="SearchBar">
                <input type="text" placeholder="Artists or songs" value={search} onChange={inputSearch}/>
                <button onClick={handleClick}><FontAwesomeIcon icon={faSearch}/></button>
            </div>);
}
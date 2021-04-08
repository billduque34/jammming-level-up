import { configureStore } from "@reduxjs/toolkit";
import searchReducer from '../features/search/searchSlice';
import accountNameReducer from '../features/accountName/accountNameSlice';
import playlistsListReducer from '../features/playlistsLIst/playlistsListSlice';
import playlistReducer from '../features/playlist/playlistSlice';

export const store = configureStore({
    reducer: {
        search: searchReducer,
        accountName: accountNameReducer,
        playlistsList: playlistsListReducer,
        playlist: playlistReducer
    }
});
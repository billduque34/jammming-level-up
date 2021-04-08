import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPlaylistsList } from "../../SpotifyAPI/SpotifyAPI";

export const fetchPlaylistsList = createAsyncThunk('playlistsList/fetchPlaylistsList',
    async () => {
        return await getPlaylistsList();
    });

const playlistsListSlice = createSlice({
    name: 'playlistsList',
    initialState: {
        playlistsList: [],
        isLoadingPlaylistsList: false,
        hasErrorPlaylistsList: false
    },
    reducers: {},
    extraReducers: {
        [fetchPlaylistsList.pending]: (state, action) => {
            state.isLoadingPlaylistsList = true;
            state.hasErrorPlaylistsList = false;
        },
        [fetchPlaylistsList.fulfilled]: (state, action) => {
            state.playlistsList = action.payload;
            state.isLoadingPlaylistsList = false;
            state.hasErrorPlaylistsList = false;
        },
        [fetchPlaylistsList.rejected]: (state, action) => {
            state.isLoadingPlaylistsList= false;
            state.hasErrorPlaylistsList = true;
        }
    }
});

export const selectPlaylistsList = state => state.playlistsList.playlistsList;

export default playlistsListSlice.reducer;
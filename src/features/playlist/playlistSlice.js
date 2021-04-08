import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPlaylist } from "../../SpotifyAPI/SpotifyAPI";

export const fetchPlaylist = createAsyncThunk('playlist/fetchPlaylist', 
    async (playlist_id) => {
        return await getPlaylist(playlist_id);
    });

const playlistSlice = createSlice({
    name: 'playlist',
    initialState: {
        playlist: {},
        isLoadingPlaylist: false,
        hasErrorPlaylist: false
    },
    reducers: {},
    extraReducers: {
        [fetchPlaylist.pending]: (state, action) => {
            state.isLoadingPlaylist = true;
            state.hasErrorPlaylist = false;
        },
        [fetchPlaylist.fulfilled]: (state, action) => {
            state.playlist = action.payload;
            state.isLoadingPlaylist = false;
            state.hasErrorPlaylist = false;
        },
        [fetchPlaylist.rejected]: (state, action) => {
            state.isLoadingPlaylist = false;
            state.hasErrorPlaylist = true;
        }
    }
});

export const selectPlaylist = state => state.playlist.playlist;

export default playlistSlice.reducer;
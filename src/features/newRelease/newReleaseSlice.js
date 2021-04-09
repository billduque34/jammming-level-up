import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNewRelease } from "../../SpotifyAPI/SpotifyAPI";

export const fetchNewRelease = createAsyncThunk('newRelease/fetchNewRelease', 
    async () => {
        return await getNewRelease();
    });

export const newReleaseSlice = createSlice({
    name: 'newRelease',
    initialState: {
        newRelease: [],
        isLoadingNewRelease: false,
        hasErrorNewRelease: false
    },
    reducers: {},
    extraReducers: {
        [fetchNewRelease.pending]: (state, action) => {
            state.isLoadingNewRelease = true;
            state.hasErrorNewRelease = false;
        }, 
        [fetchNewRelease.fulfilled]: (state, action) => {
            state.newRelease = action.payload;
            state.isLoadingNewRelease = false;
            state.hasErrorNewRelease = false;
        },
        [fetchNewRelease.rejected]: (state, action) => {
            state.isLoadingNewRelease = false;
            state.hasErrorNewRelease = true;
        }
    }
});

export const selectNewRelease = state => state.newRelease.newRelease;
export default newReleaseSlice.reducer;
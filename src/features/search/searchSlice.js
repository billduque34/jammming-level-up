import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { search } from "../../SpotifyAPI/SpotifyAPI";

export const fetchSearch = createAsyncThunk('search/fetchSearch', 
    async (term) => {
        return await search(term);
    });

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        search: [],
        isLoadingSearch: false,
        hasErrorSearch: false
    },
    reducers: {},
    extraReducers: {
        [fetchSearch.pending]: (state, action) => {
            state.isLoadingSearch = true;
            state.hasErrorSearch = false;
        },
        [fetchSearch.fulfilled]: (state, action) => {
            state.search = action.payload;
            state.isLoadingSearch = false;
            state.hasErrorSearch = false;
        },
        [fetchSearch.rejected]: (state, action) => {
            state.isLoadingSearch = false;
            state.hasErrorSearch = true;
        }
    }
});

export const selectSearch = state => state.search.search;
export default searchSlice.reducer;
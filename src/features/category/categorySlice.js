import { faSleigh } from "@fortawesome/free-solid-svg-icons";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../../SpotifyAPI/SpotifyAPI";

export const fetchCategories = createAsyncThunk('categories/fetchCategories', 
    async () => {
        return await getCategories();
    });

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        isLoadingCategories: false,
        hasErrorCategories: faSleigh,
    },
    reducers: {},
    extraReducers: {
        [fetchCategories.pending]: (state, action) => {
            state.isLoadingCategories = true;
            state.hasErrorCategories = false;
        }, 
        [fetchCategories.fulfilled]: (state, action) => {
            state.categories = action.payload;
            state.isLoadingCategories = false;
            state.hasErrorCategories = false;
        },
        [fetchCategories.rejected]: (state, action) => {
            state.isLoadingCategories = false;
            state.hasErrorCategories = true;
        }
    }
});

export const selectCategories = state => state.categories.categories;
export default categoriesSlice.reducer;
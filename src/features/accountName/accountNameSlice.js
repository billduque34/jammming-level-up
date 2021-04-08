import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserProfile } from "../../SpotifyAPI/SpotifyAPI";

export const fetchAccountName = createAsyncThunk('accountName/fetchAccountName', 
    async () => {
        return await getUserProfile();
    });

const accountNameSlice = createSlice({
    name: 'accountName',
    initialState: {
        accountName: {},
        isLoadingAccountName: false,
        hasErrorAccountName: false
    },
    reducers: {},
    extraReducers: {
        [fetchAccountName.pending]: (state, action) => {
            state.isLoadingAccountName = true;
            state.hasErrorAccountName = false;
        }, 
        [fetchAccountName.fulfilled]: (state, action) => {
            state.accountName = action.payload;
            state.isLoadingAccountName = false;
            state.hasErrorAccountName = false;
        },
        [fetchAccountName.rejected]: (state, action) => {
            state.isLoadingAccountName = false;
            state.hasErrorAccountName = true;
        }
    }
});

export const selectAccountName = state => state.accountName.accountName;
export default accountNameSlice.reducer;
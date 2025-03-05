import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch: false,
    },
    reducers: {
        gptSearchToggler: (state) => {
            state.showGptSearch = !state.showGptSearch;
        } 
    } 
});

export const {gptSearchToggler} = gptSlice.actions;

export default gptSlice.reducer;
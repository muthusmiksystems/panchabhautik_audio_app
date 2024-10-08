import { createSlice } from '@reduxjs/toolkit';

export const audioServiceSlice = createSlice({
    name: 'audioService',
    initialState: {
        data: [],
        name: '',
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {
        setAudioList: (state, action) => {
            state.data = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSuccess: (state, action) => {
            state.isSuccess = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
    },
});

export const { setAudioList, setName, setLoading, setSuccess, setMessage } = audioServiceSlice.actions;

export default audioServiceSlice.reducer;

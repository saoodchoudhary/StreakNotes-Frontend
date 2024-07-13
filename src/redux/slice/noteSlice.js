import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchRecivedNote = createAsyncThunk("note/fetchRecivedNote", async()=>{ 
    const response = await fetch(import.meta.env.VITE_API_URI+"/notes/recieved/"+localStorage.getItem("uid"));
    const data = await response.json();
    return data;
});


const initialState = {
    notes: [],
    status: 'idle',
    error: null
}

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchRecivedNote.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchRecivedNote.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.notes = action.payload;
        });
        builder.addCase(fetchRecivedNote.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
})






export default noteSlice.reducer;
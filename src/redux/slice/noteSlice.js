import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    notes: [], // to store the notes
    title : "Untitled", // to store the title of the note
    status: 'idle', // to check the status of the fetch
    isSaved: true, // to check if the note is saved
    error: null, // to store the error message
    isSendNotes: false, // to check if component open or not
}

// fetch Recieved Notes
export const fetchRecivedNote = createAsyncThunk("note/fetchRecivedNote", async()=>{ 
    const response = await fetch(import.meta.env.VITE_API_URI+"/notes/recieved/"+localStorage.getItem("uid"));
    const data = await response.json();
    return data;
});

// Save Notes 

export const postSaveNote = createAsyncThunk("note/postSaveNote", async({title, content, noteId}, {rejectWithValue})=>{
    console.log('noteId', noteId);
      const todayDate = new Date();
      const dateId = todayDate.toISOString().slice(0, 10);
  const response  =    await axios.post(import.meta.env.VITE_API_URI+'/notes/save-note',{
        title: title,
        noteId ,  dateId: dateId, content: content,
        uid: localStorage.getItem('uid')
      });
      console.log('response', response.data);
        return response.data;
})



const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers:{
        setIsSaved: (state, action) => {
            state.isSaved = action.payload;
        },
        setNotesTitle : (state, action) => {
            state.title = action.payload
        },
        setSendComponent: (state, action) => {
            state.isSendNotes = action.payload;
        }

    },
    extraReducers: (builder) => {
        // Fetch Recieved Notes ---
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
        // Save Note ---
        builder.addCase(postSaveNote.pending, (state, action) => {
            state.isSaved = false;
            state.status = 'loading';
            console.log('loading', action.meta);
        });
        builder.addCase(postSaveNote.fulfilled, (state, action) => {
            
            state.status = 'succeeded';
            if(!state.noteId){
                state.noteId = action.payload.noteId;
            }
            state.isSaved = true;
        });
        builder.addCase(postSaveNote.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.isSaved = false;
        });
    }
})



export const { setIsSaved } = noteSlice.actions;
export const { setNotesTitle } = noteSlice.actions;
export const { setSendComponent } = noteSlice.actions;


export default noteSlice.reducer;
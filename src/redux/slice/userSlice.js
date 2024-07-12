import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchUsers = createAsyncThunk("user/fetchUsers", async()=>{
    const response = await fetch(import.meta.env.VITE_API_URI+"/user/profile/"+localStorage.getItem("uid"));
    const data = await response.json();
    return data;
});

// suggestion friends 
 
export const fetchSuggestionsFriends = createAsyncThunk("user/fetchSuggestionsFriends", async()=>{
    const response = await fetch(import.meta.env.VITE_API_URI+"/user/getSuggestionsUser/"+localStorage.getItem("uid"));
    const data = await response.json();
    return data;
});



const initialState = {
    users: null,
    currentUser: null,
    status: "idle",
    error: null,
    streak: 0
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log('action.payload', action.payload);
            state.currentUser = action.payload;
        },
    },
    extraReducers : (builder ) =>{
        // fetch your profile
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.error = null;
            state.status = "loading";
        }),
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.streak = action.payload.streaks[0].streakCount;
            state.status = "succeeded";
        }),
        builder.addCase(fetchUsers.rejected, (state, action)=>{
            state.error = action.error.message;
            console.log('action.error.message', action.error.message);
            state.status = "failed";
        }),
        // suggestion friends
        builder.addCase(fetchSuggestionsFriends.pending, (state, action)=>{
            state.error = null;
            state.status ="loading";
        }),
        builder.addCase(fetchSuggestionsFriends.fulfilled, (state, action)=>{
            state.users = action.payload;
            state.status = "succeeded";
        }),
        builder.addCase(fetchSuggestionsFriends.rejected, (state, action)=>{
            state.error = action.error.message;
            state.status = "failed";
        })
    }
});


export const { setUser } = userSlice.actions;

export const CurrentUser = (state) => state.user.currentUser;
export const suggestionFriends = (state) => state.user.users;

export default userSlice.reducer;
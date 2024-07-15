import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




// fetch your profile
export const fetchUsers = createAsyncThunk("user/fetchUsers", async(
    {userId}, {rejectWithValue}
)=>{
    const response = await fetch(import.meta.env.VITE_API_URI+"/user/profile/"+userId);
    const data = await response.json();
    return data;
});

// suggestion friends 
 
export const fetchSuggestionsFriends = createAsyncThunk("user/fetchSuggestionsFriends", async(
    {userId}, {rejectWithValue}
)=>{
    const response = await fetch(import.meta.env.VITE_API_URI+"/user/getSuggestionsUser/"+userId);
    const data = await response.json();
    return data;
});

// follow unfollow user

export const postFollowUser = createAsyncThunk("user/postFollowUser", async({userId, followUserId}, {rejectWithValue}) =>{
    const response = await fetch(import.meta.env.VITE_API_URI+"/user/follow", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            followUserId
        })
    });
    const data = await response.json();
    return data;

})


const initialState = {
    users: null, 
    currentUser: null, // to show profile
    status: "idle", // loading, succeeded, failed
    error: null, // error message
    followedUsers: [], // to show follow unfollow button
    followButtonLoadingByUserId: [], // to show loading button
    streak: 0, // to show streak
    following: [], // to show following
    followers: [] // to show followers
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log('action.payload', action.payload);
            state.currentUser = action.payload;
        },
        setFollowedUsers: (state, action) => {
            state.followedUsers = action.payload;
        }
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
            state.following = action.payload.following;
            state.followers = action.payload.followers;
            // check if the user is following the user or not
            if(action.meta.arg.userId !== localStorage.getItem('uid')){
                if(action.payload.followers.includes(localStorage.getItem('uid'))){
                    state.followedUsers.push(action.payload._id);
                }
            }
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
        }),
        // follow unfollow user
        builder.addCase(postFollowUser.pending, (state, action)=>{
            state.error = null;
            state.followButtonLoadingByUserId.push(action.meta.arg.followUserId);
        }),
        builder.addCase(postFollowUser.fulfilled, (state, action)=>{
            console.log('action.payload', action.payload);
            console.log('action.meta', action.meta.arg);
            const {followUserId , userId } = action.meta.arg;
            state.followButtonLoadingByUserId = state.followButtonLoadingByUserId.filter((id) => id !== followUserId);

            if(action.payload.message === "Followed"){
                state.followedUsers.push(followUserId);
                state.followers.push(userId);
            }
            else{
                state.followedUsers = state.followedUsers.filter((id) => id !== followUserId);
                state.followers = state.followers.filter((id) => id !== userId);
            }

        }),
        builder.addCase(postFollowUser.rejected, (state, action)=>{
            state.followButtonLoadingByUserId = state.followButtonLoadingByUserId.filter((id) => id !== action.meta.arg.followUserId);
            state.error = action.error.message;
        }
        )
    }
});


export const { setUser } = userSlice.actions;
export const { setFollowedUsers } = userSlice.actions;

export const CurrentUser = (state) => state.user.currentUser;
export const suggestionFriends = (state) => state.user.users;

export default userSlice.reducer;
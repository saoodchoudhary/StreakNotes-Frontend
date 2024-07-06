import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import HomePage from './page/HomePage';
import StreakCalendar from './page/StreakCalendar';
import Profile from './page/Profile';
import AddNotes from './page/AddNotes';
import Register from './page/Register';
import Login from './page/Login';
import RecievedNotes from './page/RecievedNotes';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from "./components/ProtectedRoutes"
import NotesList from './page/NotesList';
import FriendsPage from './page/FriendsPage';
import { RecievedNotesDetailsProvider } from './context/RecievedNotesDetailsContext';
import FollowerFollowingPage from './page/FollowerFollowingPage';

function App() {
  return (
    <AuthProvider>
      <RecievedNotesDetailsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<ProtectedRoute element={HomePage} />} />
            <Route path="calendar/:id" element={<ProtectedRoute element={StreakCalendar} />} />
            <Route path="notes/list/:id" element={<ProtectedRoute element={NotesList} />} />
            <Route path="friends" element={<ProtectedRoute element={FriendsPage} />} />
            <Route path="profile/:id" element={<ProtectedRoute element={Profile} />} />
          </Route>
          <Route path="addNotes/:id" element={<ProtectedRoute element={AddNotes} />} />
          <Route path="register" element={<Register />} />
          <Route path="profile/follower-following/:which/:id" element={<FollowerFollowingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="recieved-notes" element={<ProtectedRoute element={RecievedNotes} />} />
        </Routes>
      </BrowserRouter>
      </RecievedNotesDetailsProvider>
    </AuthProvider>
  );
}

export default App;

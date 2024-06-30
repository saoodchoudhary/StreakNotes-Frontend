import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import Home from './page/Home'
import HomePage from './page/HomePage'
import StreakCalendar from './page/StreakCalendar'
import Profile from './page/Profile'
import AddNotes from './page/AddNotes'
import Register from './page/Register'
import Login from './page/Login'
import RecievedNotes from './page/RecievedNotes'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route index element={<HomePage />} />
          <Route path="/calendar/:id" element={<StreakCalendar />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        <Route path='/addNotes/:id' element={<AddNotes />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/recieved-notes' element={<RecievedNotes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

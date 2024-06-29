import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import Home from './page/Home'
import HomePage from './page/HomePage'
import Calendar from './page/Calendar'
import Profile from './page/Profile'
import AddNotes from './page/AddNotes'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route index element={<HomePage />} />
          <Route path="/calendar/:id" element={<Calendar />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        <Route path='/addNotes/:id' element={<AddNotes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

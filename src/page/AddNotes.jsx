import React from 'react'
import { useParams } from 'react-router-dom';
import NotesHeader from '../components/addNotes/NotesHeader';
import NotesMainSection from '../components/addNotes/NotesMainSection';

const AddNotes = () => {
   const {id} = useParams();
   console.log(id);
  return (
    <div>
        <NotesHeader/>
        <NotesMainSection/>
    </div>
  )
}

export default AddNotes

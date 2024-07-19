import React from 'react'
import { useParams } from 'react-router-dom';
import NotesHeader from '../components/addNotes/NotesHeader';
import NotesMainSection from '../components/addNotes/NotesMainSection';
import AddNotesInput from '../components/addNotes/AddNotesInput';
import BackBtnNavbar from '../components/layout/BackBtnNavbar';

const AddNotes = () => {
   const {id} = useParams();
   console.log(id);
  return (
    <>
        {/* <NotesHeader/>
         */}

         {/* <BackBtnNavbar text={'Add Notes'}/> */}
        {/* <NotesMainSection/> */}
        <NotesHeader/>
        <AddNotesInput/>
    </>
  )
}

export default AddNotes

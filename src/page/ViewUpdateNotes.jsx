import React from 'react'
import { useParams } from 'react-router-dom';
import BackBtnNavbar from '../components/layout/BackBtnNavbar';
import UpdateNotesInput from '../components/ViewUpdateNotes/UpdateNotesInput';

const ViewUpdateNotes = () => {
    const {noteId} = useParams();
   return (
     <div>
         {/* <NotesHeader/>
          */}
 
          <BackBtnNavbar text={'Add Notes'}/>
         {/* <NotesMainSection/> */}
         <UpdateNotesInput nId={noteId}/>
     </div>
   )
}

export default ViewUpdateNotes

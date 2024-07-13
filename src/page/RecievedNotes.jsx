import React, { useContext, useEffect, useState } from 'react';
import BackBtnNavbar from '../components/layout/BackBtnNavbar';
import './../styles/pageAnimation.css' // Ensure you import your CSS file
import axios from 'axios';
import DetailsRecievedNotes from '../components/DetailsRecievedNotes/DetailsRecievedNotes';
import { useDispatch, useSelector } from "react-redux";
import { RecievedNotesDetailsContext } from '../context/RecievedNotesDetailsContext';
import truncate from 'html-truncate';
import { fetchRecivedNote } from '../redux/slice/noteSlice';

const RecievedNotes = () => {
  const [openDetails, setOpenDetails] = useState(false);

  const dispatch = useDispatch();

  const notes = useSelector(state => state.note);
  const recievedNotes = notes.notes;
  

  const {setRecievedNotesDetails} = useContext(RecievedNotesDetailsContext);

  const handleRecievedNotesDetails = (note) => {
    setOpenDetails(true);
    setRecievedNotesDetails(note);
  }

  useEffect(() => {
    dispatch(fetchRecivedNote());
  }, []);

  return (
    <div className="slide-in-right">
      <BackBtnNavbar text="Recieved Notes" />
      <div className='mt-[60px] px-3 bg-white min-h-screen'>
      <div>
        {recievedNotes.length !== 0  &&    recievedNotes.recievedNotes.map((note) => {
            // Truncate the HTML content to the first 50 characters
            const truncatedContent = note.content ? truncate(note.content, 30) : '';
          return (
          
          <div   key={note._id}>
          <div onClick={()=>{handleRecievedNotesDetails(note)}} className="border bg-white border-gray-200 p-4 rounded-md mb-4 cursor-pointer">
            <h2 className="text-lg font-bold">{note.title}</h2>
            <p className="text-sm text-gray-500">By {note.owner.username} on {note.dateId}</p>
            <div className="mt-2" dangerouslySetInnerHTML={{__html: truncatedContent}}/>
          </div>
          </div>
        )})}
        {recievedNotes.length === 0 && <div className="text-center mt-4">No notes recieved yet</div>}
      </div>  </div>
     {openDetails && <DetailsRecievedNotes onClose={()=>{setOpenDetails(false)}}/> }
    </div>
  );
};

export default RecievedNotes;

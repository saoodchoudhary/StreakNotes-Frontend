import React, { useContext, useEffect, useState } from 'react';
import BackBtnNavbar from '../components/layout/BackBtnNavbar';
import './../styles/pageAnimation.css' // Ensure you import your CSS file
import axios from 'axios';
import DetailsRecievedNotes from '../components/DetailsRecievedNotes/DetailsRecievedNotes';
import { RecievedNotesDetailsContext } from '../context/RecievedNotesDetailsContext';
import truncate from 'html-truncate';

const RecievedNotes = () => {
  const [recievedNotes, setRecievedNotes] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);

  const {recievedNotesDetails ,setRecievedNotesDetails} = useContext(RecievedNotesDetailsContext);

  const handleRecievedNotesDetails = (note) => {
    setOpenDetails(true);
    setRecievedNotesDetails(note);
    console.log('note', openDetails);
    console.log('recievedNotesDetails', recievedNotesDetails);
  }

  useEffect(() => {
    const fetchRecievedNotes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URI}/notes/recieved/${localStorage.getItem('uid')}`);
        console.log('response', response.data); // Check the response data
        setRecievedNotes(response.data);
      } catch (error) {
        console.error('Error fetching recieved notes:', error);
      }
    };

    fetchRecievedNotes();
  }, []);

  if (recievedNotes.length === 0) {
    return <p>Loading...</p>;
  }
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
        {recievedNotes.recievedNotes.length === 0 && <div className="text-center mt-4">No notes recieved yet</div>}
      </div>  </div>
     {openDetails && <DetailsRecievedNotes onClose={()=>{setOpenDetails(false)}}/> }
    </div>
  );
};

export default RecievedNotes;

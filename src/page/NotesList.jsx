import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import truncate from 'html-truncate';
import { findIndexOfMonth } from '../utils/findIndexOfMonth';
import BackBtnNavbar from '../components/layout/BackBtnNavbar';

const NotesList = () => {
    const params = useParams();
    const [notesList, setNotesList] = useState([
        {
            id: 0,
            title: "",
            content: null,
            created_at: "",
        }
    ]);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        setIsLoading(true);
        const fetchNotes = async () => {
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/notes/list`, {
                dateId: params.id,
                uid: localStorage.getItem('uid')
            });
            const data = response.data;
            setNotesList(data);
            setIsLoading(false);
            console.log(data);
        }
        fetchNotes();
    }, [params.id]);

    if (isLoading) {
        return <div>Loading...</div>
    }
      // Array of background colors
      const backgroundColors = [
        'bg-blue-50', 'bg-green-50', 'bg-red-50', 'bg-yellow-50', 'bg-indigo-50', 'bg-pink-50', 'bg-purple-50', 'bg-gray-50'
    ];

    return (
        <div className='pb-[60px] min-h-screen bg-white slide-in-up mt-[60px]'>
            <BackBtnNavbar text='Notes' />
           {notesList &&<div className='grid grid-cols-2 gap-3 px-4 py-2'>
                {notesList.map((note, _) => {
                    
                  const date =  findIndexOfMonth(note.dateId)
                    // Truncate the HTML content to the first 50 characters
                    const truncatedContent = note.content ? truncate(note.content, 40) : '';
                    const color = backgroundColors[_ % backgroundColors.length]

                    return (
                        <Link to={`/updateNotes/${note._id}`} key={_} >
                            <div className={`border relative ${color} rounded-md h-[200px] p-2`}>
                                <h2>{note.title}</h2>
                                <div dangerouslySetInnerHTML={{ __html: truncatedContent }}></div>
                                <p className='absolute z-20 bottom-0 right-0 px-2 bg-orange-600 text-white text-[10px] rounded-tl-md font-medium rounded-br-md'>{date}</p>
                            </div>
                            <h3 className='text-center'>Untitled</h3>
                        </Link>
                    )
                })}
            </div> } 
            {notesList.length === 0 && <div className="text-center flex justify-center h-screen align-middle -mt-[60px]"><div className=' self-center'>No notes Found</div></div>}
        </div>
    )
}

export default NotesList

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import truncate from 'html-truncate';

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

    return (
        <div className='pb-[60px] min-h-screen bg-white'>
            <div className='grid grid-cols-2 gap-3 px-4 py-2'>
                {notesList.map((note, _) => {
                    // Truncate the HTML content to the first 50 characters
                    const truncatedContent = note.content ? truncate(note.content, 30) : '';

                    return (
                        <div key={_} >
                            <div className='border relative bg-white rounded-md h-[200px] p-2'>
                                <h2>{note.title}</h2>
                                <div dangerouslySetInnerHTML={{ __html: truncatedContent }}></div>
                                <p className='absolute z-20 bottom-0 right-0 px-2 bg-orange-600 text-white text-[10px] rounded-tl-md font-medium rounded-br-md'>20 jun</p>
                            </div>
                            <h3 className='text-center'>Untitled</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NotesList

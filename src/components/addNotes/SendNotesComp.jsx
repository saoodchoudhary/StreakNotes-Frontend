import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import "../../styles/pageAnimation.css"

const SendNotesComp = ({ NotesSample, noteId, onClose }) => {
    const [getSendUserForNotes, setGetSendUserForNotes] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchSendUserForNotes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URI}/user/getSendUserForNotes/${localStorage.getItem('uid')}`);
                setGetSendUserForNotes(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSendUserForNotes();
    }, [noteId]);

    const handleUserSelect = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const handleSendNotes = async () => {
        console.log(selectedUsers);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/notes/send`, {
                noteId,
                userIds: selectedUsers,
            });
            console.log(response.data);
            // Handle success (e.g., show a success message or update state)
        } catch (err) {
            console.error(err);
            // Handle error (e.g., show an error message)
        }
    };

    const filteredUsers = getSendUserForNotes.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='fixed top-[0px] z-50 w-full flex flex-col h-[100%] border bg-white slide-in-up '>
            <div className='flex gap-4 p-4 border-b'>
                <IoArrowBack onClick={onClose} className='cursor-pointer self-center' />
                <h2 className='text-lg font-semibold'>Send Notes</h2>
            </div>
            <div className='p-4'>
                <input
                    type='text'
                    placeholder='Search user'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full p-2 border rounded'
                />
            </div>
          {selectedUsers.length > 0 &&  <div className='px-5  h-[80px] flex gap-5 border-t border-b no-scrollbar overflow-x-auto '>
                {selectedUsers.map((userId) => {
                    const user = getSendUserForNotes.find(user => user._id === userId);
                    return (
                        <div key={userId} className='self-center flex-shrink-0'>
                            <img src='/profile-logo.jpg' className=' rounded-full h-12 w-12 object-cover inline-block'/>
                        </div>

                    )
                })}
            </div>
} 
            <div className=' overflow-y-auto pb-20'>
                {filteredUsers.map((user) => (
                    <div
                        key={user._id}
                        className={`p-4 cursor-pointer ${selectedUsers.includes(user._id) ? 'bg-blue-200' : 'bg-white'}`}
                        onClick={() => handleUserSelect(user._id)}
                    >
                        <img src={"/profile-logo.jpg"} alt={user.fullName} className='w-8 h-8 rounded-full inline-block object-cover mr-2' />
                        <span>{user.fullName}</span>
                    </div>
                ))}
            </div>
            <div className='pb-4 p-4 bg-white fixed bottom-0 w-full z-20'>
                <button onClick={handleSendNotes} className='w-full p-2 bg-blue-500 text-white rounded'>
                    Send Notes
                </button>
            </div>
        </div>
    );
};

export default SendNotesComp;

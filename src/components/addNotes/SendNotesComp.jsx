import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import "../../styles/pageAnimation.css"
import { useNavigate } from 'react-router-dom';

const SendNotesComp = ({ NotesSample, noteId, onClose }) => {
    const [getSendUserForNotes, setGetSendUserForNotes] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sendNotesSuccess, setSendNotesSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();



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
        setIsLoading(true)
        
        // get today's date
        const todayDate = new Date();
      const dateId = todayDate.toISOString().slice(0, 10);

        console.log(selectedUsers);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/notes/send`, {
                noteId,
                userIds: selectedUsers,
            });
            console.log(response.data);
            setSendNotesSuccess(true);
            setIsLoading(false);

            const timer = setTimeout(() => {
                const path = `/notes/list/${dateId}`;
                setSendNotesSuccess(false);
                clearTimeout(timer);
                onClose();
                navigate(path);
            }, 800);
            
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
          {selectedUsers.length > 0 &&  <div className='px-5  h-[80px] flex gap-5 border-t py-3 shadow-sm bg-white mb-[2px] border-b no-scrollbar overflow-x-auto '>
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
             { !sendNotesSuccess ? (<button onClick={handleSendNotes} className='w-full p-2 bg-blue-500 text-white rounded'>
                    Send Notes
                </button>):(
                    isLoading ? <div className='w-full border border-blue-500 rounded flex justify-center p-2'> 
                    <div className=' w-[26px] h-[26px]  rounded-full border-blue-500 border-t-transparent border-[3px] animate-spin'></div>
                    </div> :
                      <div className='w-full border bg-green-500 text-white rounded flex justify-center p-2'> 
                        <span>Notes Sent</span>
                    </div>
                )}   
            </div>
        </div>
    );
};

export default SendNotesComp;

import React from 'react';
import BackBtnNavbar from '../components/layout/BackBtnNavbar';
import './../styles/pageAnimation.css' // Ensure you import your CSS file

const NotesList = [
  {
    id: 1,
    title: "Note 1",
    username: "user1",
    createdAt: "2021-09-01",
    content: "This is the content of note 1"
  },
  {
    id: 2,
    title: "Note 2",
    username: "user2",
    createdAt: "2021-09-02",
    content: "This is the content of note 2"
  },
  {
    id: 3,
    title: "Note 3",
    username: "user3",
    createdAt: "2021-09-03",
    content: "This is the content of note 3"
  },
  {
    id: 4,
    title: "Note 4",
    username: "user4",
    createdAt: "2021-09-04",
    content: "This is the content of note 4"
  },
  {
    id: 5,
    title: "Note 5",
    username: "user5",
    createdAt: "2021-09-05",
    content: "This is the content of note 5"
  },
  {
    id: 6,
    title: "Note 6",
    username: "user6",
    createdAt: "2021-09-06",
    content: "This is the content of note 6"
  },
  {
    id: 7,
    title: "Note 7",
    username: "user7",
    createdAt: "2021-09-07",
    content: "This is the content of note 7"
  },
  {
    id: 8,
    title: "Note 8",
    username: "user8",
    createdAt: "2021-09-08",
    content: "This is the content of note 8"
  },
  {
    id: 9,
    title: "Note 9",
    username: "user9",
    createdAt: "2021-09-09",
    content: "This is the content of note 9"
  },
  {
    id: 10,
    title: "Note 10",
    username: "user10",
    createdAt: "2021-09-10",
    content: "This is the content of note 10"
  
  }
];

const RecievedNotes = () => {
  return (
    <div className="slide-in-right">
      <BackBtnNavbar text="Recieved Notes" />
      <div className='mt-[70px] px-3'>
        {NotesList.map((note) => (
          <div key={note.id} className="border bg-white border-gray-200 p-4 rounded-md mb-4">
            <h2 className="text-lg font-bold">{note.title}</h2>
            <p className="text-sm text-gray-500">By {note.username} on {note.createdAt}</p>
            <p className="mt-2">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecievedNotes;

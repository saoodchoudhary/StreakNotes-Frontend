import React, { useContext } from 'react'
import { RecievedNotesDetailsContext } from '../../context/RecievedNotesDetailsContext';

const DetailsRecievedNotes = ({ onClose}) => {
   const { recievedNotesDetails } = useContext(RecievedNotesDetailsContext);
 
  return (

    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>

      <div className='bg-white w-[90%] h-[90%] max-w-md max-h-[90%] rounded-lg p-4 overflow-y-auto'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg font-bold'>{recievedNotesDetails.title}</h2>
          <button onClick={onClose} className='text-red-500'>Close</button>
        </div>
        <p className='text-sm text-gray-500'>By {recievedNotesDetails.owner.username} on {recievedNotesDetails.dateId}</p>
        <div className='mt-2 max-w-full break-before-all' dangerouslySetInnerHTML={{__html: recievedNotesDetails.content}}/>
      </div>
    </div>

      
  )
}

export default DetailsRecievedNotes

import React from 'react'

const NotesSample = [
    {
        img: "",
        voice : "",
        video : "https://www.youtube.com/watch?v=JGwWNGJdvx8",
        description : <div> <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta reiciendis illo, et tenetur atque ad. </p></div>,
    },
    {
        img: "",
        voice : "https://www.soundjay.com/button/beep-07.wav",
        video : "https://www.youtube.com/watch?v=JGwWNGJdvx8",
        description : <div> <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta reiciendis illo, et tenetur atque ad. </p></div>,
    },
    {
        img: "",
        voice : '',
        video : "https://www.youtube.com/watch?v=JGwWNGJdvx8",
        description : <div> <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta reiciendis illo, et tenetur atque ad. </p></div>,
    },
    {
        img: "",
        voice : "",
        video : "",
        description : <div> <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta reiciendis illo, et tenetur atque ad. </p></div>,
    },
    {
        img: "",
        voice : "",
        video : "",
        description : <div> <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta reiciendis illo, et tenetur atque ad. </p></div>,
    }
]
const NotesMainSection = () => {
  return (
    <div className='my-2'>
        {/* <div>
            <input title='Title' type='text' placeholder='Title' className='py-2 px-2' />
        </div> */}
        <div>
            <div className='flex flex-col gap-3 px-2'>
                {NotesSample.map((note, index) => (
                    <div key={index} className='bg-white flex flex-col gap-2 p-2 rounded-md border-l-2 border-green-400'>
                      {note.img && <div> <img src={note.img}
                        alt='note'
                        className='h-[150px] w-[150px] object-cover rounded-md'
                        /> </div>} 
                      {note.voice && <audio controls>
                            <source src={note.voice} type="audio/wav" />
                        </audio> } 
                       {note.video && <video controls>
                            <source src={note.video} type="video/mp4" />
                        </video> }
                      {note.description && <div className='text-gray-800 text-[16px]'>{note.description}</div>}
                      <div className='text-gray-400 text-sm'>24th June 2024</div>
                        </div>
                ))}
            </div>
        </div>
        <div>
            <textarea title='Description' placeholder='Description' className='py-2 px-2 fixed w-full outline-none bottom-[60px] z-40'></textarea>   
        </div>
        <div></div>
      
    </div>
  )
}

export default NotesMainSection

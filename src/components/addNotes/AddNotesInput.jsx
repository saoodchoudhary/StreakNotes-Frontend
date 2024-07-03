import React, { useRef, useState, useEffect } from 'react';
import { AiOutlineBold, AiOutlineItalic, AiOutlineOrderedList, AiOutlineUnorderedList } from 'react-icons/ai';
import { BiHeading } from 'react-icons/bi';
import { MdFormatColorText } from 'react-icons/md';
import axios from 'axios';

const AddNotesInput = () => {
  const editorRef = useRef(null);
  const [noteId, setNoteId] = useState(null); // to store the note ID
  const [content, setContent] = useState('');
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    unorderedList: false,
    orderedList: false,
    heading: false,
    redText: false,
    blueText: false,
    greenText: false,
  });

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    updateActiveFormats();
  };

  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      unorderedList: document.queryCommandState('insertUnorderedList'),
      orderedList: document.queryCommandState('insertOrderedList'),
      heading: document.queryCommandValue('formatBlock') === 'h1',
      redText: document.queryCommandValue('foreColor') === 'rgb(255, 0, 0)',
      blueText: document.queryCommandValue('foreColor') === 'rgb(0, 0, 255)',
      greenText: document.queryCommandValue('foreColor') === 'rgb(0, 128, 0)',
    });
  };

  useEffect(() => {
    document.addEventListener('selectionchange', updateActiveFormats);
    return () => {
      document.removeEventListener('selectionchange', updateActiveFormats);
    };
  }, []);


  const saveNotes = async () => {
    try {
      const response = await axios.post('http://192.168.0.108:8000/api/notes/save-note', { noteId, content: editorRef.current.innerHTML});
      if (!noteId) {
        console.log('noteId', response.data.noteId);
        setNoteId(response.data.noteId);
      }
    } catch (error) {
      console.error('Failed to save note', error);
    }
  };

  useEffect(() => {
    console.log(content);
    const saveNote = setTimeout(async () => {
       saveNotes();
    }, 300);

    return () => clearTimeout(saveNote); 
  }, [content]);




  return (
    <div className="flex flex-col h-full">
      <div 
        ref={editorRef} 
        className="w-full min-h-[80vh] mt-[108px] p-4 bg-white outline-none overflow-auto"
        contentEditable 
        placeholder="Write your note here..."
        onInput={() => setContent(editorRef.current.innerHTML)}
      ></div>

      <div 
        tabIndex={0} 
        className=" bg-white border-t fixed top-[60px] right-0 left-0 py-2 no-scrollbar overflow-auto z-10 h-[48px] border-b-[1px]"
      >
        <div className='flex gap-2 px-3 '>
          <button 
            onClick={() => formatText('formatBlock', 'H1')} 
            className={`px-2 py-1 border rounded ${activeFormats.heading ? 'bg-gray-300' : 'bg-gray-200'}`}
          >
            <BiHeading size={20} />
          </button>
          <button 
            onClick={() => formatText('insertUnorderedList')} 
            className={`px-2 py-1 border rounded ${activeFormats.unorderedList ? 'bg-gray-300' : 'bg-gray-200'}`}
          >
            <AiOutlineUnorderedList size={20} />
          </button>
          <button 
            onClick={() => formatText('insertOrderedList')} 
            className={`px-2 py-1 border rounded ${activeFormats.orderedList ? 'bg-gray-300' : 'bg-gray-200'}`}
          >
            <AiOutlineOrderedList size={20} />
          </button>
          <button 
            onClick={() => formatText('italic')} 
            className={`px-2 py-1 border rounded ${activeFormats.italic ? 'bg-gray-300' : 'bg-gray-200'}`}
          >
            <AiOutlineItalic size={20} />
          </button>
          <button 
            onClick={() => formatText('bold')} 
            className={`px-2 py-1 border rounded ${activeFormats.bold ? 'bg-gray-300' : 'bg-gray-200'}`}
          >
            <AiOutlineBold size={20} />
          </button>
          <button 
            onClick={() => formatText('foreColor', 'red')} 
            className={`px-2 py-1 border rounded ${activeFormats.redText ? 'bg-red-300' : 'bg-gray-200'}`}
          >
            <MdFormatColorText size={20} color="red" />
          </button>
          <button 
            onClick={() => formatText('foreColor', 'blue')} 
            className={`px-2 py-1 border rounded ${activeFormats.blueText ? 'bg-blue-300' : 'bg-gray-200'}`}
          >
            <MdFormatColorText size={20} color="blue" />
          </button>
          <button 
            onClick={() => formatText('foreColor', 'green')} 
            className={`px-2 py-1 border rounded ${activeFormats.greenText ? 'bg-green-300' : 'bg-gray-200'}`}
          >
            <MdFormatColorText size={20} color="green" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNotesInput;

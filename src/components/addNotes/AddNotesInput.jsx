import React, { useRef, useState, useEffect } from 'react';
import { AiOutlineBold, AiOutlineItalic, AiOutlineOrderedList, AiOutlineUnorderedList } from 'react-icons/ai';
import { BiHeading } from 'react-icons/bi';
import { MdFormatColorText, MdKeyboardArrowRight } from 'react-icons/md';
import SendNotesComp from './SendNotesComp';
import { useDispatch, useSelector } from 'react-redux';
import { postSaveNote, setIsSaved, setSendComponent } from '../../redux/slice/noteSlice';

const AddNotesInput = () => {
  const editorRef = useRef(null);
  const allBtnRef = useRef(null);
  const [content, setContent] = useState('');

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    unorderedList: false,
    orderedList: false,
    heading: false,
    blackText: false,
    redText: false,
    blueText: false,
    greenText: false,
  });

  const dispatch = useDispatch();

  const notes = useSelector(state => state.note);
  const isSendNotes = notes.isSendNotes;
  const title = notes.title;
  const isSaved = notes.isSaved;
  const [noteId, setNoteId] = useState(null);

  // bottom height of the editor
  const [bottomHeight, setBottomHeight] = useState(0);

  useEffect(() => {
    visualViewport.addEventListener('resize', () => {
      const visualViewportHeight = window.visualViewport.height;
      const innerHeight = document.documentElement.clientHeight;
      const bottomH =   innerHeight - visualViewportHeight;
      setBottomHeight(bottomH);
    });

  }, [bottomHeight]);

  const handleRightScroll = () => {
    if(bottomHeight > 0){
      
    editorRef.current.focus();
    }
    allBtnRef.current.scrollTo({
      left: allBtnRef.current.scrollLeft + 100,
      behavior: 'smooth',
    })
  };

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
      blackText: document.queryCommandValue('foreColor') === 'rgb(0, 0, 0)',
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
    console.log('saving note');

   const des =  await dispatch(postSaveNote({title , content: editorRef.current.innerHTML, noteId: noteId}));
   console.log('des', des.payload);
    setNoteId(des.payload.noteId);
   
  };


  useEffect(() => {
    dispatch(setIsSaved(false));    
    console.log(content);
    const saveNote = setTimeout(() => {
       saveNotes();
    }, 500);

    return () => clearTimeout(saveNote); 
  }, [content, title]);



  return (
    <div className="flex flex-col w-full" >
     
          
      {(isSaved) ? <div className='h-2 w-2 bg-green-500 rounded-full fixed top-[70px] right-4 z-40'></div> : <div  className='h-2 w-2 bg-red-500 z-40 rounded-full fixed top-[70px] right-4 animate-pulse'></div> }
         
      <div 
        ref={editorRef} 
        className="w-full fixed top-[60px]  p-4 bg-white outline-none overflow-y-auto"
        contentEditable={true}    
        style={{ bottom: bottomHeight + 60 + 'px', height: `calc(100% - ${bottomHeight + 120}"px")`} }    
        placeholder="Write your note here..."
        onInput={() => setContent(editorRef.current.innerHTML)}
      ></div>

      <div 
        className={` bg-gray-50 fixed  right-0 left-0 px-4   z-10 `} style={{bottom: bottomHeight+"px"}}
      >
        <div ref={allBtnRef} className='relative flex no-scrollbar overflow-auto  items-center h-[60px] gap-2 pr-[70px] transition-all'>
          <button onClick={()=>{handleRightScroll()}} className='text-[30px] h-[56px] my-[2px] px-5 fixed right-0 bg-white rounded-l-full shadow-xl font-semibold self-center z-50 active:text-blue-600 transition-colors '><MdKeyboardArrowRight /></button>
          <button 
            onClick={() => formatText('formatBlock', 'H1')} 
            className={`px-2 py-1 border rounded ${activeFormats.heading ? 'text-white bg-gray-600' : ''}`}
          >
            <BiHeading size={20} />
          </button>
          <button 
            onClick={() => formatText('insertUnorderedList')} 
            className={`px-2 py-1 border rounded ${activeFormats.unorderedList ? 'text-white bg-gray-600' : ''}`}
          >
            <AiOutlineUnorderedList size={20} />
          </button>
          <button 
            onClick={() => formatText('insertOrderedList')} 
            className={`px-2 py-1 border rounded ${activeFormats.orderedList ? 'text-white bg-gray-600' : ''}`}
          >
            <AiOutlineOrderedList size={20} />
          </button>
          <button 
            onClick={() => formatText('italic')} 
            className={`px-2 py-1 border rounded ${activeFormats.italic ? 'text-white bg-gray-600' : ''}`}
          >
            <AiOutlineItalic size={20} />
          </button>
          <button 
            onClick={() => formatText('bold')} 
            className={`px-2 py-1 border rounded ${activeFormats.bold ? 'text-white bg-gray-600' : ''}`}
          >
            <AiOutlineBold size={20} />
          </button>
          <button 
            onClick={() => formatText('foreColor', 'black')} 
            className={`px-2 py-1 border rounded ${activeFormats.blackText ? 'text-white bg-gray-900' : ' text-black'}`}
          >
            <MdFormatColorText size={20} />
          </button>
          <button 
            onClick={() => formatText('foreColor', 'red')} 
            className={`px-2 py-1 border rounded ${activeFormats.redText ? 'text-white bg-red-600 ' : ' text-red-500'}`}
          >
            <MdFormatColorText size={20}  />
          </button>
          <button 
            onClick={() => formatText('foreColor', 'blue')} 
            className={`px-2 py-1 border rounded ${activeFormats.blueText ? 'text-white bg-blue-700' : ' text-blue-700 '}`}
          >
            <MdFormatColorText size={20}  />
          </button>
          <button 
            onClick={() => formatText('foreColor', 'green')} 
            className={`px-2 py-1 border rounded ${activeFormats.greenText ? 'text-white bg-green-700' : 'text-green-700'}`}
          >
            <MdFormatColorText size={20}  />
          </button>
        </div>
      </div>

    {isSendNotes &&  <SendNotesComp NotesSample={[]} noteId={noteId} onClose={()=>{dispatch(setSendComponent(false))}} /> }
    </div>
  );
};

export default AddNotesInput;

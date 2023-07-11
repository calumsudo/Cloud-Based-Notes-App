import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { saveNote, deleteNote } from "../../firebase";
import './TextEditor.css';

function TextEditor({ uid, note }) {
  const [text, setText] = useState(note.content || '');
  const [showTextarea, setShowTextarea] = useState(true);
 

  useEffect(() => {
    setText(note.content || '');
  }, [note]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSave = () => {
    if(note.id){
      saveNote(text, uid, note.id);
    }
    else{
      saveNote(text, uid);
    }
  };
  const handleDeleteNote = () => {
    deleteNote(note.id, uid);
    setShowTextarea(false);
  };
  useEffect(() => {
    setShowTextarea(true);
  },[note])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
          Save
        </Button>
        <Button variant="contained" color="error" startIcon={<DeleteForeverIcon />} onClick={handleDeleteNote}>
          Delete
        </Button>
      </div>
      <div className="container">
        {showTextarea && <textarea className="textarea" rows="10" value={text} onChange={handleChange} ></textarea>}
      </div>
    </div>
  );
}

export default TextEditor;

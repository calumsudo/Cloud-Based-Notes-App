import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { saveNote } from "../../firebase";
import './TextEditor.css';

function TextEditor({ uid, note }) {
  const [text, setText] = useState(note.context || '');
 

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

  console.log(note.content);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <Button variant="outlined" startIcon={<SaveIcon />} onClick={handleSave}>
          Save
        </Button>
      </div>
      <div className="container">
        <textarea className="textarea" rows="10" value={text} onChange={handleChange} ></textarea>
      </div>
    </div>
  );
}

export default TextEditor;

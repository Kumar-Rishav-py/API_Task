import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('https://api.gyanibooks.com/library/get_dummy_notes')
      .then(response => response.json())
      .then(data => setNotes(data))
      .catch(error => console.log(error));
  }, []);

  const parseNotesContent = (content) => {
    if (!content) return '';
    const parsedContent = JSON.parse(content);
    const paragraphs = parsedContent.content.filter(block => block.type === 'paragraph');
    const texts = paragraphs.map(paragraph => paragraph.content.map(text => text.text).join(''));
    return texts.join('\n');
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Dummy Notes
      </Typography>
      {notes.map(note => (
        <div key={note.id}>
          <Typography variant="h4">{note.title}</Typography>
          <Typography variant="subtitle1">{note.category}</Typography>
          <Typography variant="body1">{parseNotesContent(note.notes)}</Typography>
        </div>
      ))}
    </Container>
  );
}

export default App;

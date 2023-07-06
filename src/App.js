import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  styled,
} from '@mui/material';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: 'auto',
  maxWidth: '100%',
  padding: theme.spacing(2),
  '@media (max-width: 1300px)': {
    padding: theme.spacing(1),
  },
}));

const StyledTable = styled(Table)({
  minWidth: 500,
  '@media (max-width: 1300px)': {
    minWidth: 'auto',
  },
});

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        'https://api.gyanibooks.com/library/get_dummy_notes'
      );
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  return (
    <StyledTableContainer component={Paper}>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notes.map((note) => (
            <TableRow key={note.id}>
              <TableCell>{note.id}</TableCell>
              <TableCell>{note.user}</TableCell>
              <TableCell>{note.title}</TableCell>
              <TableCell>{note.category}</TableCell>
              <TableCell>{note.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
}

export default App;

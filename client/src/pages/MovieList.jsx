import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material/'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import { Box, Modal } from '@mui/material';

import MovieInsert from './MovieInsert';
import api from '../api';

function MovieInsertModal(props) {
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const onCancel = function() {
    props.onCancel();
  }
  
  const onInsert = function() {
    props.onInsert();
  }

  return (
    <Modal open={props.isOpen()}>
      <Box sx={style}>
        <MovieInsert 
          onCancel={onCancel} 
          onInsert={onInsert}
        />
      </Box>
    </Modal>
  )
}

export default function MovieList() {

  const [rows, setRows] = React.useState([])
  const [reloadCounter, setReloadCounter] = React.useState(0)

  const [showInsertModal, setShowInsertModal] = React.useState(false);

  const handleEdit = function(row, event){
    window.location.href = `/movies/update/${row._id}`;
  }

  const handleDelete = async function(row, event){
    if (window.confirm(`Do tou want to delete the movie ${row._id} permanently?`)) {
        await api.deleteMovieById(row._id);
        reloadTable();
    }    
  }

  const handleAdd = function() {
    console.log(`handleAdd:${showInsertModal}`);
    setShowInsertModal(true);
  }

  const getInsertModalState = function() {
    console.log(`showInsertModal:${showInsertModal}`);
    return showInsertModal;
  }

  const reloadTable = function() {
    setReloadCounter( (reloadCounter + 1) % 2 );
  }

  React.useEffect( async() => {
    await api.getAllMovies().then(response => {
        console.log(response.data.data);
        setRows(response.data.data)
    });
  }, [reloadCounter]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row._id}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="right">{row.rating}</TableCell>
              <TableCell align="right">{row.time.join(' - ')}</TableCell>
              <TableCell align="center">  
                <Stack spacing={2} direction="row">
                  <IconButton aria-label="Edit" onClick={ (e) => handleEdit(row, e) }>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={ (e) => handleDelete(row, e) }>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <IconButton aria-label="delete" onClick={handleAdd}>
        <AddIcon />
      </IconButton>
      <MovieInsertModal 
        isOpen={getInsertModalState} 
        onCancel={() => setShowInsertModal(false)} 
        onInsert={() => {
          reloadTable();
          setShowInsertModal(false);
      }}/>
    </TableContainer>
  );
}
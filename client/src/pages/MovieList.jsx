import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';

import { Box, Modal } from '@mui/material';

import MovieInsert from './MovieInsert';

import styled from 'styled-components'
import api from '../api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function MovieInsertModal(props) {
  
  const onCancel = function() {
    props.setClose();
  }
  
  const onInsert = function() {
    props.onInsert();
  }

  return (
    <Modal open={props.openState()}>
      <Box sx={style}>
        <MovieInsert onCancel={onCancel} onInsert={onInsert}></MovieInsert>
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
      <MovieInsertModal openState={getInsertModalState} setClose={() => setShowInsertModal(false)} onInsert={ () => {
        reloadTable();
        setShowInsertModal(false);
      }}></MovieInsertModal>
    </TableContainer>
  );
}
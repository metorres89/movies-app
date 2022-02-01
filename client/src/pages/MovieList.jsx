import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material/'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import { Box, Modal } from '@mui/material';

import styled from 'styled-components'

import MovieInsert from './MovieInsert';
import MovieUpdate from './MovieUpdate';
import api from '../api';

const Wrapper = styled.div.attrs({
  className: 'flex-container-col',
})`
  height: 100%;
  width: 90%;
  padding-left:5%;
  padding-right:5%;
  box-sizing:none;
`

function ActionModal(props) {
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    borderRadius: 8,
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={props.isOpen()}>
      <Box sx={style}>
        {props.renderActionPage()}
      </Box>
    </Modal>
  )
}

export default function MovieList() {

  const [rows, setRows] = React.useState([])
  const [reloadCounter, setReloadCounter] = React.useState(0)
  const [showInsertModal, setShowInsertModal] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [actionId, setActionId] = React.useState('');

  const getInsertModalState = function() { return showInsertModal }
  const getUpdateModalState = function() { return showUpdateModal }

  const handleEdit = function(row, event){
    setActionId(row._id)
    setShowUpdateModal(true)
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

  const reloadTable = function() {
    setReloadCounter( (reloadCounter + 1) % 2 );
  }

  React.useEffect( () => {
    async function fetchData(){
      await api.getAllMovies().then(response => {
          console.log(response.data.data);
          setRows(response.data.data)
      });
    }
    fetchData();
  }, [reloadCounter]);

  return (
    <Wrapper>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
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
      </TableContainer>

      <Button 
        variant="outlined" 
        startIcon={<AddIcon />}  
        onClick={handleAdd}
      >
        Add Movie
      </Button>

        <ActionModal
          isOpen={getInsertModalState} 
          renderActionPage={ () => (
            <MovieInsert 
              onCancel={() => setShowInsertModal(false)} 
              onInsert={() => {
                reloadTable();
                setShowInsertModal(false);
              }}
            />
          )}
        />

        <ActionModal
          isOpen={getUpdateModalState} 
          renderActionPage={ () => (
            <MovieUpdate 
              actionId={actionId}
              onCancel={() => setShowUpdateModal(false)} 
              onUpdate={() => {
                reloadTable();
                setShowUpdateModal(false);
              }}
            />
          )}
        />
    </Wrapper>
  );
}
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

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import styled from 'styled-components'
import api from '../api';

const TimeList = styled.ul`
    list-style-type: none;
`

export default function BasicTable() {

  const [rows, setRows] = React.useState([])
  const [reloadCounter, setReloadCounter] = React.useState(0)

  const handleEdit = function(row, event){
    window.location.href = `/movies/update/${row._id}`;
  }

  const handleDelete = async function(row, event){
    if (window.confirm(`Do tou want to delete the movie ${row._id} permanently?`)) {
        await api.deleteMovieById(row._id);
        setReloadCounter(reloadCounter + 1);
    }    
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
              <TableCell align="right"><TimeList>{row.time.join(' - ')}</TimeList></TableCell>
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
  );
}
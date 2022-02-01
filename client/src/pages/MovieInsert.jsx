import React, { useState } from 'react'
import api from '../api'
import { Button, TextField } from '@mui/material'
import styled from 'styled-components'

const Wrapper = styled.div.attrs({
    className: 'flex-container-col',
})`
    min-height: 400px;
`

export default function MovieInsert(props) {

    const [getState, setState] = useState({
        name: '',
        rating: '',
        time: '',
        onCancel: props.onCancel,
        onInsert: props.onInsert,
    })

    const handleInputChange = event => {
        //setState({...getState, [event.target.name]: event.target.value})
        setState( prevValues => {
            return {...prevValues, [event.target.name]: event.target.value }
        })
    }

    const handleChangeInputRating = async event => {
        const rating = event.target.validity.valid
            ? event.target.value
            : getState.rating

        setState( prevValues => {
            return {...prevValues, rating: rating }
        })
    }

    const handleAddMovie = async () => {
        const { name, rating, time } = getState
        const arrayTime = time.split('/')
        const payload = { name, rating, time: arrayTime }

        await api.insertMovie(payload).then(res => {
            setState({
                name: '',
                rating: '',
                time: '',
            })
            const { onInsert } = getState;
            if(onInsert) onInsert();
        })
    }

    const handleCancel = async event => {
        const { onCancel } = getState;
        if(onCancel) onCancel();
    }

    const buttonContainer = {
        width: 300
    };

    return (
        <Wrapper>
            <h2>Create a Movie</h2>
            
            <TextField 
                id="movieName" 
                label="Name" 
                variant="filled" 
                name="name"
                value={getState.name} 
                onChange={handleInputChange} 
            />

            <TextField 
                id="movieRating" 
                label="Rating" 
                variant="filled" 
                name="rating"
                type="number"
                step="0.1"
                lang="en-US"
                min="0"
                max="10"
                pattern="[0-9]+([,\.][0-9]+)?"
                value={getState.rating}
                onChange={handleChangeInputRating}
            />

            <TextField 
                id="movieTime" 
                label="Time" 
                variant="filled" 
                name="time"
                value={getState.time}
                onChange={handleInputChange}
            />

            <div class="flex-container-row" style={buttonContainer}>
                <Button variant="contained" onClick={handleAddMovie}>Add Movie</Button>
                <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>
            </div>
        </Wrapper>
    )
}
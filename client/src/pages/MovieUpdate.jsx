import React, { useState, useEffect } from 'react'
import { Button, TextField } from '@mui/material'
import api from '../api'
import styled from 'styled-components'

const Wrapper = styled.div.attrs({
    className: 'flex-container-col',
})`
    min-height: 400px;
`

function MovieUpdate(props) {
    
    console.log(props.actionId);

    const [getState, setState] = useState({
        targetId: props.actionId,
        name: '',
        rating: '',
        time: ''
    })

    const handleInputChange = event => {
        //setState({...getState, [event.target.name]: event.target.value})
        setState( prevValues => {
            return {...prevValues, [event.target.name]: event.target.value }
        })
    }

    const handleChangeInputRating = async event => {
        const newRating = event.target.validity.valid
            ? event.target.value
            : getState.rating

        setState( prevValues => {
            return {...prevValues, rating: newRating }
        })
    }

    const handleUpdateMovie = async () => {
        const arrayTime = getState.time.split('/')
        const payload = { name: getState.name, rating: getState.rating, time: arrayTime }

        console.log(payload);
        console.log(getState.targetId);

        await api.updateMovieById(getState.targetId, payload).then(res => {
            console.log(`Movie updated successfully`)
            if(props.onUpdate)
                props.onUpdate()
        })
    }
    
    const handleCancel = async () => {
        if(props.onCancel)
            props.onCancel()
    }

    useEffect(() => {
        const movie = api.getMovieById(getState.targetId).then(response => {
            setState( prevValues => {
                        return {
                            ...prevValues,
                            name: response.data.data.name,
                            rating: response.data.data.rating,
                            time: response.data.data.time.join('/')
                        }
                    });
        })
    }, [getState.targetId]); // Solo se vuelve a ejecutar si currentMovie cambia

    const buttonContainer = {
        width: 300
    };

    return (
        <Wrapper>
            <h2>Update Movie</h2>

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
            <div className="flex-container-row" style={buttonContainer}>
                <Button variant="contained" onClick={handleUpdateMovie}>Update</Button>
                <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>
            </div>
            
        </Wrapper>
    )
}

export default MovieUpdate

import React, { useState } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
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

    return (
        <Wrapper>
            <Title>Create a Movie</Title>
            <Label>Name: </Label>
            <InputText 
                type="text" 
                name="name"
                value={getState.name} 
                onChange={handleInputChange} 
            />

            <Label>Rating: </Label>
            <InputText
                type="number"
                step="0.1"
                lang="en-US"
                min="0"
                max="10"
                pattern="[0-9]+([,\.][0-9]+)?"
                value={getState.rating}
                onChange={handleChangeInputRating}
            />

            <Label>Time: </Label>
            <InputText
                type="text"
                name="time"
                value={getState.time}
                onChange={handleInputChange}
            />

            <Button onClick={handleAddMovie}>Add Movie</Button>
            <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        </Wrapper>
    )
}
import React, { useState, useEffect } from 'react'
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
function MovieUpdate(props) {
    const [id, setId] = useState(props.actionId)
    const [name, setName] = useState('')
    const [rating, setRating] = useState(0)
    const [time, setTime] = useState('')

    const handleChangeInputName = async event => {
        const name = event.target.value
        setName(name)
    }

    const handleChangeInputRating = async event => {
        const newRating = event.target.validity.valid
            ? event.target.value
            : rating

        setRating(newRating);
    }

    const handleChangeInputTime = async event => {
        const time = event.target.value
        setTime(time)
    }

    const handleUpdateMovie = async () => {
        const arrayTime = time.split('/')
        const payload = { name, rating, time: arrayTime }

        await api.updateMovieById(id, payload).then(res => {
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
        const movie = api.getMovieById(id).then(response => {
            setName(response.data.data.name)
            setRating(response.data.data.rating)
            setTime(response.data.data.time.join('/'))
        })
    }, [id]); // Solo se vuelve a ejecutar si currentMovie cambia

    return (
        <Wrapper>
            <Title>Update Movie</Title>

            <Label>Name: </Label>
            <InputText
                type="text"
                value={name}
                onChange={handleChangeInputName}
            />

            <Label>Rating: </Label>
            <InputText
                type="number"
                step="0.1"
                lang="en-US"
                min="0"
                max="10"
                pattern="[0-9]+([,\.][0-9]+)?"
                value={rating}
                onChange={handleChangeInputRating}
            />

            <Label>Time: </Label>
            <InputText
                type="text"
                value={time}
                onChange={handleChangeInputTime}
            />

            <Button onClick={handleUpdateMovie}>Update Movie</Button>
            <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        </Wrapper>
    )
}

export default MovieUpdate

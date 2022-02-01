import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

export default function Links() {
    return (
        <React.Fragment>
            <Link to="/" className="navbar-brand">
                My first MERN Application
            </Link>
            <Collapse>
                <List>
                    <Item>
                        <Link to="/movies/list" className="nav-link">
                            Movies
                        </Link>
                    </Item>
                </List>
            </Collapse>
        </React.Fragment>
    )
}
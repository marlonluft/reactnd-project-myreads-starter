import React from 'react'
import './App.css'
import propTypes from 'prop-types'

ShelfOptions.propTypes = {
    shelf: propTypes.string.isRequired
}

function ShelfOptions(props) {

    const { shelf } = props

    return (
        <select value={shelf}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
    )
}

export default ShelfOptions
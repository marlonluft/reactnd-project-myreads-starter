import React from 'react'
import './App.css'
import propTypes from 'prop-types'

ShelfOptions.propTypes = {
    shelf: propTypes.string.isRequired,
    onChangeShelf: propTypes.func.isRequired // function to update books in search/list page, in case of shelf has been changed
}

function ShelfOptions(props) {

    const { shelf, onChangeShelf } = props

    return (
        <select value={shelf} onChange={(event) => onChangeShelf(event.target.value)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
    )
}

export default ShelfOptions
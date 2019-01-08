import React from 'react'
import './App.css'
import propTypes from 'prop-types'

ShelfOptions.propTypes = {
    book: propTypes.object.isRequired
}

function checkShelf(book) {
    return book && book.shelf ? book.shelf : 'none';
}

function ShelfOptions(props) {

    const { book } = props

    return (
        <select value={checkShelf(book)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
    )
}

export default ShelfOptions
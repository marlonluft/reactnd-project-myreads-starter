import React from 'react'
import './App.css'
import propTypes from 'prop-types'
import ShelfOptions from './ShelfOptions.js'
import * as BooksAPI from './BooksAPI'

BooksGrid.propTypes = {
    books: propTypes.array.isRequired,
    ShelfUpdate: propTypes.func.isRequired
}

function concatAuthors(authors) {
    // Concatenate the array of author in one text to show in page
    return authors ?
        authors.join(', ') : '';
}

function checkThumbnail(imageLinks) {
    // Check if the thumbnail exist, else set empty
    return imageLinks && imageLinks.thumbnail ? imageLinks.thumbnail : '';
}

function checkShelf(book) {
    // Check if the shelf exist, else set none
    return book && book.shelf ? book.shelf : 'none';
}

function onChangeShelf(bookId, shelf, func) {
    // On shelf change, update the book in the api and call the function in the father component
    BooksAPI.update({ id: bookId }, shelf).then((response) => {
        func(response)
    })
}

function BooksGrid(props) {
    return (
        <ol className="books-grid">
            {props.books.map((book) => (
                <li key={book.id}>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${checkThumbnail(book.imageLinks)}")` }}></div>
                            <div className="book-shelf-changer">
                                <ShelfOptions shelf={checkShelf(book)} onChangeShelf={(shelf) => onChangeShelf(book.id, shelf, props.ShelfUpdate)} />
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{concatAuthors(book.authors)}</div>
                    </div>
                </li>
            ))}
        </ol>
    )
}

export default BooksGrid
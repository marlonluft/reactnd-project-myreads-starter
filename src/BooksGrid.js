import React from 'react'
import './App.css'
import propTypes from 'prop-types'
import ShelfOptions from './ShelfOptions.js'

BooksGrid.propTypes = {
    books: propTypes.array.isRequired
}

function concatAuthors(authors) {
    return authors ?
        authors.join(', ') : '';
}

function checkThumbnail(imageLinks) {
    return imageLinks && imageLinks.thumbnail ? imageLinks.thumbnail : '';
}

function checkShelf(book) {
    return book && book.shelf ? book.shelf : 'none';
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
                                <ShelfOptions shelf={checkShelf(book)} />
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
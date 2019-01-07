import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid.js'

class ListBooks extends React.Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <BooksGrid />
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <BooksGrid />
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <BooksGrid />
                            </div>
                        </div>
                    </div>
                </div>
                <Link className="open-search" to='/search'>
                    <div>Add a book</div>
                </Link>
            </div>
        )
    }
}

export default ListBooks
import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid.js'
import * as BooksAPI from './BooksAPI'

class ListBooks extends React.Component {
    state = {
        BooksCurrentlyReading: [],
        BooksWantToRead: [],
        BooksRead: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {

            this.setState({
                BooksCurrentlyReading: books.filter((book) => {
                    return book.shelf === 'currentlyReading'
                }),
                BooksWantToRead: books.filter((book) => {
                    return book.shelf === 'wantToRead'
                }),
                BooksRead: books.filter((book) => {
                    return book.shelf === 'read'
                })
            })
        })
    }

    render() {

        const { BooksCurrentlyReading, BooksWantToRead, BooksRead } = this.state

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
                                <BooksGrid books={BooksCurrentlyReading} />
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <BooksGrid books={BooksWantToRead} />
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <BooksGrid books={BooksRead} />
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
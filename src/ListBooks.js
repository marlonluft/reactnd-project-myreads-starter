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
        // Gets all saved books to list in page to they correspondent shelf
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

    ShelfUpdate = (response) => {
        // Refresh the list of books with the correct shelf for each book
        this.componentDidMount();
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
                                <BooksGrid books={BooksCurrentlyReading} ShelfUpdate={this.ShelfUpdate} />
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <BooksGrid books={BooksWantToRead} ShelfUpdate={this.ShelfUpdate} />
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <BooksGrid books={BooksRead} ShelfUpdate={this.ShelfUpdate} />
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
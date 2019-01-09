import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid.js'
import * as BooksAPI from './BooksAPI'

function GetBookId(book) {
    return book.id;
}

function FilterBooks(books, shelf) {
    return books.filter((book) => book.shelf === shelf);
}

class SearchBooks extends React.Component {
    state = {
        search: '',
        booksFounded: [],
        savedBooks: []
    }

    componentDidMount() {
        // Gets all saved books to ensure the searched books are with the correct shelves selected
        BooksAPI.getAll().then((books) => {

            const savedBooksObj = {
                currentlyReading: FilterBooks(books, 'currentlyReading').map(GetBookId),
                read: FilterBooks(books, 'read').map(GetBookId),
                wantToRead: FilterBooks(books, 'wantToRead').map(GetBookId)
            }

            this.setState({
                savedBooks: savedBooksObj
            })
        })
    }

    onSearchChange = (searchValue) => {
        // Change the search value when the user type something and then search in the api
        this.setState({
            search: searchValue
        })

        this.ListBooks(searchValue);
    }

    ListBooks = (searchValue) => {
        // Search books in the api that match with what the user typed
        BooksAPI.search(searchValue)
            .then((books) => {
                this.setState({
                    // If what the user entered is empty, blanks or the API returned an error, then returns an empty array
                    booksFounded: (/\S/.test(this.state.search)) && books && !books.error ? books : []
                });

                // After search matched books, then update books with their respective shelves that aready saved
                this.ShelfUpdate(this.state.savedBooks);
            })
    }

    ShelfUpdate = (response) => {

        // Refresh the list of books with the correct shelf for each book
        if (response && response.currentlyReading && response.read && response.wantToRead) {
            let booksFoundedUpdated = this.state.booksFounded.map((book) => {
                if (response.currentlyReading.indexOf(book.id) >= 0) {
                    book.shelf = 'currentlyReading';
                }
                else if (response.read.indexOf(book.id) >= 0) {
                    book.shelf = 'read';
                }
                else if (response.wantToRead.indexOf(book.id) >= 0) {
                    book.shelf = 'wantToRead';
                }
                else {
                    book.shelf = 'none';
                }

                return book;
            })

            this.setState({
                booksFounded: booksFoundedUpdated
            })
        }
    }

    render() {

        const { search, booksFounded } = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" value={search} onChange={(event) => this.onSearchChange(event.target.value)} placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksGrid books={booksFounded} ShelfUpdate={this.ShelfUpdate} />
                </div>
            </div>
        )
    }
}

export default SearchBooks
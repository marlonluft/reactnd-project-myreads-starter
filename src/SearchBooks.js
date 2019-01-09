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
        this.setState({
            search: searchValue
        })

        this.ListBooks(searchValue);
    }

    ListBooks = (searchValue) => {
        BooksAPI.search(searchValue)
            .then((books) => {
                this.setState({
                    booksFounded: (/\S/.test(this.state.search)) && books && !books.error ? books : []
                });

                this.ShelfUpdate(this.state.savedBooks);
            })
    }

    ShelfUpdate = (response) => {
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
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
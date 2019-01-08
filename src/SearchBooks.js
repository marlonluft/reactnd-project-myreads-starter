import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid.js'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {
    state = {
        search: '',
        booksFounded: []
    }

    onSearchChange = (searchValue) => {

        searchValue = searchValue.trim();

        this.setState({
            search: searchValue
        })

        this.ListBooks(searchValue);
    }

    ListBooks = (searchValue) => {
        if (/\S/.test(searchValue)) {
            BooksAPI.search(searchValue)
                .then(books => this.setState({
                    booksFounded: books
                }))
        }
        else {
            this.setState({
                booksFounded: []
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
                    <BooksGrid books={booksFounded} />
                </div>
            </div>
        )
    }
}

export default SearchBooks
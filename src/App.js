import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks.js'
import ListBooks from './ListBooks.js'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  render() {
    return (
        <div className="app">
          <Route exact path='/search' component={SearchBooks}/>
          <Route exact path='/' component={ListBooks}/>
        </div>
    )
  }
}

export default BooksApp
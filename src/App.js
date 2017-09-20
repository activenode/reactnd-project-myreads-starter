import React from 'react'
import './App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import { BrowserRouter, Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books: books});
    }).catch(() => this.setState({books: []}));
  }

  updateBook = function(book) {
    BooksAPI.update(book, book.shelf).then(() => {
      this.setState(state => {
        return {
          books: state.books.map(bookItem => {
            if (bookItem.id === book.id) {
              return book;
            }
            return bookItem;
          })
        };
      });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/" render={() => (
            <ListBooks books={this.state.books} updateBook={book => this.updateBook(book)} />
          )} />
          <Route exact path="/search" component={SearchBooks} />
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './Books/BookShelf';
import Loader from './Loader';
import * as BooksAPI from './BooksAPI';

function Debouncer() {
	let timeout = setTimeout(()=>{});
	return function(fn) {
    clearTimeout(timeout);
		var later = function() {
			timeout = null;
			fn();
		};
		timeout = setTimeout(later, 150);
	};
}

const debounce = Debouncer();

class SearchBooks extends Component {
  state = {
    query: '',
    searching: false,
    foundBooks: []
  }

  onChange(e) {
    const value = (e.target.value || '').trim();
    this.setState({query: value});

    debounce(()=>{
      this.setState({searching: true});

      BooksAPI.search(value).then(books => {
        this.setState({
          foundBooks: Array.isArray(books) ? books : []
        })
      })
      .catch(()=>{})
      .then(()=>this.setState({searching: false}));
    });
  }

  mergeResultsWithOwnBooks(ownedBooks) {
    const ownedBooksIdToIndexMap = ownedBooks.reduce((acc, book, index) => {
      acc[book.id] = index + 1; //because 0 == false
      return acc;
    }, {});
    //TODO: stuff
    return (this.state.foundBooks || []).map(book => {
      if (ownedBooksIdToIndexMap[book.id]) {
        return Object.assign({}, book, {shelf: ownedBooks[ownedBooksIdToIndexMap[book.id] - 1].shelf || 'none'});
      }

      return book;
    });
  }

  render() {
    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                onChange={e => this.onChange(e)}
                type="text"
                placeholder="Search by title or author"
                value={this.state.query} />
            </div>
          </div>
          <div className="search-books-results">
            {this.state.searching && <Loader />}
            {this.state.query && !this.state.searching &&
              <BookShelf 
                key="searchResults"
                title={`Search Results for '${this.state.query}'`}
                books={this.mergeResultsWithOwnBooks(this.props.books)}
                bookConfig={{cssClasses: 'at-search'}}
                updateBook={this.props.updateBook} />}
          </div>
        </div>
    );
  }
}

export default SearchBooks

import React from 'react'
import './App.css';
import './Anim.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import { BrowserRouter, Route } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books: books});
      console.log(books);
    }).catch(() => this.setState({books: []})); //TODO: add errorneous on catch()
  }

  updateBook = function(book) {
    let prevState;

    //now set OPTIMISTIC state first
    this.setState(state => {
      prevState = state;

      return {
        books: state.books.map(bookItem => {
          if (bookItem.id === book.id) {
            return book;
          }
          return bookItem;
        })
      };
    });

    BooksAPI.update(book, book.shelf).catch(()=>{
      this.setState(prevState); //reset optimistic state
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Route render={props=>{
          let isSearch = false;
          if (props.location.pathname.match('/search')) {
            isSearch = true;
          }

          return (
          <div className={`app ${isSearch ? 'is-search' : ''}`}>
            <ListBooks books={this.state.books} updateBook={book => this.updateBook(book)} />

            <CSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={150}
              transitionLeaveTimeout={150}>
              <Route exact path="/search" key={props.location.key} location={props.location} component={SearchBooks} />
            </CSSTransitionGroup>
          </div>)
        }} />
      </BrowserRouter>
    );
  }
}

export default BooksApp

import React from 'react';
import BookShelf from './Books/BookShelf';
import { Link } from 'react-router-dom';

const shelves = [
  {
    shelf: 'currentlyReading',
    title: 'Currently Reading'
  },
  {
    shelf: 'wantToRead',
    title: 'Want to Read'
  },
  {
    shelf: 'read',
    title: 'Read'
  }
];

function ListBooks(props) {
  return (
    <div className="list-books" style={props.style}>
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map(({shelf, title})=>(
            <BookShelf 
              key={shelf} 
              shelf={shelf} 
              title={title} 
              books={props.books} 
              updateBook={props.updateBook} />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default ListBooks
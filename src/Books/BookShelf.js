import React from 'react';
import Book from './Book';

function filterByConstraint(books, shelf) {
  return (books || []).filter(book => book.shelf === shelf);
}

function BookShelf(props) {
  const booksToShow = !props.shelf ? props.books : filterByConstraint(props.books, props.shelf);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
      {!!booksToShow.length ?
        <ol className="books-grid">
          {booksToShow.map(book => (
            <li key={book.id}><Book bookConfig={props.bookConfig} book={book} updateBook={props.updateBook} /></li>
          ))}
        </ol>
      : 'No books to show'}
      </div>
    </div>
  );
}

export default BookShelf

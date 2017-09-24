import React from 'react';


const selectorOptions = [
  {value: '_none_', label: 'Move to...', disabled: true},
  {value: 'currentlyReading', label: 'Currently Reading'},
  {value: 'wantToRead', label: 'Want to Read'},
  {value: 'read', label: 'Read'},
  {value: 'none', label: 'None'}
];

const getSelectorOptions = function(currentValue) {
  return selectorOptions
    .map((option, i) => {
      const _option = Object.assign({}, option);
      _option.key = i;
      if (_option.value === currentValue || (!currentValue && _option.value==='none')) {
        _option.disabled = true;
      }
      return _option;
    });
};



function Book(props) {
  const { book, updateBook } = props;
  const currentShelf = book.shelf || 'none';
  const additionalCssClasses = props.bookConfig && props.bookConfig.cssClasses;

  return (
    <div className={`book ${additionalCssClasses} ${currentShelf === 'none' ? '' : 'is-added'}`}>
      <div className="book-top">
        {/*
        TODO: ImageLoad Element for book-cover
        */}
        <div className="book-cover"
          style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
        <div className="book-shelf-changer">
          <select value={currentShelf} 
            onChange={event => {
              updateBook(Object.assign({}, book, {shelf: event.target.value}))
            }}>
            { getSelectorOptions(currentShelf).map(option => (
              <option
                key={option.key} 
                value={option.value}
                disabled={option.disabled}>{option.label}</option>
            )) }
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors && <div className="book-authors">{book.authors.join(', ')}</div>}
    </div>
  );
}

export default Book;

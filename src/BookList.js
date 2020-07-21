import React from 'react';
import Book from './Book';
class BookList extends React.Component {

    render() {
        const books = this.props.books;
        return (
            books !== undefined &&
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => <li key={book.id}><Book data={book} eventHandeler={this.props.eventHandeler} /></li>)}
                </ol>
            </div>);
    }
}

export default BookList;
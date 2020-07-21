import React from 'react';
import * as BooksApi from './BooksAPI';
import BookList from './BookList';
import { Link } from 'react-router-dom';

class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.eventHandeler = this.eventHandeler.bind(this);
    }

    state = {
        query: '',
        books: []
    };

    eventHandeler(e) {
        const txt = e.target.value;
        this.setState(() => {
            return {
                query: txt
            };
        })
        BooksApi.search(txt).then(data => {
            this.setState(() => {
                return {
                    books: data === undefined ? [] : (data.error ? [] : data)
                };
            });
            BooksApi.getAll().then(res => {
                this.setState((state) => {
                    const arr = state.books;
                    res.forEach((book) => {
                        const elem = arr.find((x) => x.id == book.id);
                        if (elem)
                            elem.shelf = book.shelf;
                    });
                    return state;
                });
            });
        });

    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={this.eventHandeler} />
                    </div>
                </div>
                <div className="search-books-results">
                    <BookList books={this.state.books} eventHandeler={this.props.eventHandeler} />
                </div>
            </div>
        );
    }
}

export default SearchForm;
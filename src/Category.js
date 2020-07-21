import React from 'react';
import BooKList from './BookList';

class Category extends React.Component {

    render() {
        const shelf = this.props.shelf;
        const books = this.props.books;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{`${shelf}`}</h2>
                <BooKList books={books} eventHandeler={this.props.eventHandeler} />
            </div>
        );
    }
}

export default Category;
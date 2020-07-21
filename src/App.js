import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Category from './Category'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import SearchForm from './SearchForm'
class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.changeShelf = this.changeShelf.bind(this);
  }

  state = {
    wantToRead: [],
    currentlyReading: [],
    Read: []
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    BooksAPI.getAll().then(data => {
      const wantToRead = data.filter(book => book.shelf == "wantToRead");
      const currentlyReading = data.filter(book => book.shelf == "currentlyReading");
      const read = data.filter(book => book.shelf == "read");
      this.setState({
        wantToRead,
        currentlyReading,
        read
      });
    });
  }

  changeShelf(id, new_shelf) {
    BooksAPI.update({ id }, new_shelf).then(() => { this.getBooks(); });

  }

  render() {
    return (
      <Router>
        <Route exact path="/" render={() => {
          return (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Category shelf="Currently Reading" books={this.state.currentlyReading} eventHandeler={this.changeShelf} />
                  <Category shelf="want to Read" books={this.state.wantToRead} eventHandeler={this.changeShelf} />
                  <Category shelf="Read" books={this.state.read} eventHandeler={this.changeShelf} />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search"><button>Add a book</button></Link>
              </div>
            </div>
          )
        }} />
        <Route path="/search" render={() => {
          return <SearchForm eventHandeler={this.changeShelf} />
        }} />
      </Router>
    );
  }

}

export default BooksApp;
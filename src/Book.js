import React from 'react';

class Book extends React.Component {

  render() {
    const data = this.props.data;
    const img_url = data.imageLinks ? data.imageLinks.smallThumbnail : '';
    const title = data.title;
    const authors = data.authors ? data.authors : '';
    const shelf = data.shelf;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${img_url})` }}></div>
          <div className="book-shelf-changer">
            <select value={shelf ? shelf : 'none'} onChange={(e) => { this.props.eventHandeler(data.id, e.target.value) }} >
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{`${title}`}</div>
        <div className="book-authors">{`${authors}`}</div>
      </div>);
  }
}

export default Book;
import React, { Component } from "react";
import "./App.css";
import Keys from "./Credentials.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      error: null,
      isLoad: false,
      photos: []
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = e => {
    this.setState({ query: e.target.value });
  };
  handleSearch = queryPhotos => {
    const key = Keys.access_key;
    const url = `https://api.unsplash.com/search/photos?page=3&query=${queryPhotos}&client_id=${key}`;
    this.setState({ isLoad: true });
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoad: false,
            photos: result.results,
            query: ""
          });
        },
        error => {
          this.setState({
            isLoaded: false,
            error: error
          });
        }
      );
  };
  handleSubmit = e => {
    this.handleSearch(this.state.query);
  };

  render() {
    const { error, isLoad, photos } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (isLoad) {
      return <div className="lds-dual-ring" />;
    } else {
      return (
        <div className="containerWrapper">
          <h1>Looking for Photos</h1>
          <div className="searchArea">
            <input
              type="text"
              value={this.state.query}
              onChange={this.handleChange}
            />
            <button type="submit" id="search" onClick={this.handleSubmit}>
              Search
            </button>
          </div>
          <div className="imageList">
            <ul>
              {photos.map(photo => (
                <li key={photo.id} className="column">
                  <a href={photo.urls.regular}>
                    <img
                      src={photo.urls.small}
                      alt="images"
                      onClick={this.handleClickImage}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  }
}
export default App;

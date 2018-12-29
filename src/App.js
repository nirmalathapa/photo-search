import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="containerWrapper">
        <h1>hello</h1>
        <div className="searchArea">
          <input type="text" />
          <button id="search">Search</button>
        </div>
      </div>
    );
  }
}

export default App;

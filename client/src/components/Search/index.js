import React, { Component } from 'react';
import './index.css';

class Search extends Component {
  render() {
    return (
      <div className="container">
        <nav id="searchNav">
          <div className="nav-wrapper">
            <form>
              <div className="input-field">
                <input id="search" type="search" required placeholder="Enter code here" />
                <label><i className="material-icons">search</i></label> <i className="material-icons">close</i> </div>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default Search;
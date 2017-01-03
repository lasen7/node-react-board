import React, { Component } from 'react';
import './index.css';

import { browserHistory } from 'react-router';

import alert from 'alertifyjs';

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      code: ''
    };
  }

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let code = this.state.code;
    code = (+code);

    if (isNaN(code)) {
      alert.error('Please input number!');
    } else {
      browserHistory.push(`/event/${code}/ask`);
    }
  }

  render() {
    return (
      <div className="container">
        <nav id="searchNav">
          <div className="nav-wrapper">
            <form onSubmit={this.handleSubmit}>
              <div className="input-field teal">
                <input
                  id="search"
                  name="code"
                  type="search"
                  required
                  placeholder="Enter code here"
                  value={this.state.code}
                  onChange={this.handleChange} />
                <label><i className="material-icons">search</i></label> <i className="material-icons">close</i> </div>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default Search;
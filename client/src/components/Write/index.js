/* global $ */

import React, { Component } from 'react';
import './index.css';

const propTypes = {
  onCreateEvent: React.PropTypes.func
};

const defaultProps = {
  onCreateEvent: (id, pw) => { console.error('onCreateEvent function not defined'); }
};

class Write extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      content: ''
    };
  }


  componentDidMount() {
    $('.modal').modal({
      ready: () => {
        this.contentInput.focus();
      }
    });
  }

  handleCreateEvent = () => {
    const {name, content } = this.state;

    this.props.onCreateEvent(name, content)
      .then(result => {
        if (!result) {
          this.contentInput.focus();
        } else {
          this.setState({
            name: '',
            content: ''
          });
          $('#modal1').modal('close');
        }
      })
  }

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    return (
      <div className="container Write">
        <div className="row">
          <span className="grey-text">Ask the speaker</span>
          <div className="card">
            <a href="#modal1">
              <div className="card-content">
                <i className="material-icons Green">question_answer</i>
                <span className="Question">Type your question</span>
              </div>
            </a>

            <div id="modal1" className="modal">
              <div className="modal-content">
                <i className="material-icons User Circle">perm_identity</i>
                <input
                  name="name"
                  className="Write-name"
                  type="text"
                  placeholder="Add your name"
                  value={this.state.name}
                  onChange={this.handleChange} />
                <textarea
                  name="content"
                  ref={(input) => { this.contentInput = input } }
                  className="materialize-textarea"
                  placeholder="Type your question"
                  value={this.state.content}
                  onChange={this.handleChange} >
                </textarea>
              </div>
              <div className="modal-footer">
                <a
                  className="modal-action waves-effect waves-green btn"
                  onClick={this.handleCreateEvent}>Send</a>
                <a className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

Write.propTypes = propTypes;
Write.defaultProps = defaultProps;

export default Write;
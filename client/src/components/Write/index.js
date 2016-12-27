import React, { Component } from 'react';
import './index.css';

class Write extends Component {

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
                <input className="Write-name" type="text" placeholder="Add your name" />
                <textarea className="materialize-textarea" placeholder="Type your question"></textarea>
              </div>
              <div className="modal-footer">
                <a className="modal-action waves-effect waves-green btn">Send</a>
                <a className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Write;
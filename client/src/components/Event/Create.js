import React, { Component } from 'react';
import './Create.css';

const propTypes = {
  onCreateEvents: React.PropTypes.func,
};

const defaultProps = {
  onCreateEvents: (id, pw) => { console.error('onCreateEvents function not defined'); },
};

class Create extends Component {

  constructor(props) {
    super(props);

    this.state = {
      eventName: '',
      eventId: ''
    };
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.handleCreateEvents();
    }
  }

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleCreateEvents = () => {
    const eventName = this.state.eventName;
    const eventId = this.state.eventId;

    this.props.onCreateEvents(eventName, eventId)
      .then(result => {
        if (result === -1) {
          this.setState({
            eventName: '',
            eventId: ''
          });
        } else if (result === 1) {
          this.eventNameInput.focus();
        } else if (result === 2 || result === 3) {
          this.eventIdInput.focus();
        }
      })
  }

  render() {
    return (
      <div className="row Event">
        <div className="card">
          <div className="card-content">
            <div className="Wrapper">
              <label htmlFor="eventName"><i className="material-icons">add</i></label>
              <input
                id="eventName"
                className="Event-create"
                name="eventName"
                type="text"
                placeholder="Create new event"
                value={this.state.eventName}
                onChange={this.handleChange}
                ref={(input) => { this.eventNameInput = input } }
                />
              <input
                className="Event-create"
                name="eventId"
                type="text"
                placeholder="Input event id"
                value={this.state.eventId}
                onChange={this.handleChange}
                ref={(input) => { this.eventIdInput = input } }
                onKeyPress={this.handleKeyPress}
                />
              <a
                className="waves-effect waves-light btn"
                onClick={this.handleCreateEvents}
                >add</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

Create.propTypes = propTypes;
Create.defaultProps = defaultProps;

export default Create;
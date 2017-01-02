import React, { Component } from 'react';
import { EventHeader, Ask, Profile } from 'components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { browserHistory } from 'react-router';

import * as event from 'actions/event';

import alert from 'alertifyjs';
import storage from 'utils/storage';

const keyPrefix = 'Board.';
const keySuffix = '.Auth.Token';

class Event extends Component {

  componentDidMount() {
    const {params} = this.props;

    const loadMemoLoop = () => {
      this.loadNewMemo()
        .then(() => {
          this.memoLoaderTimeoutId = setTimeout(loadMemoLoop, 10000);
        })
    };

    // Fetch data first and set token in localStorage
    this.props.actions.listEvent({ eventId: params.eventId })
      .then(() => {
        if (this.props.listStatus.status === 'SUCCESS') {
          const key = `${keyPrefix}${params.eventId}${keySuffix}`;
          const token = storage.get(key);
          if (!token) {
            storage.set(key, this.props.listStatus.token);
          }

          loadMemoLoop();
          this.getProfile();
        } else {
          alert.error('Not found event');
          browserHistory.push('/');
        }
      });
  }

  loadNewMemo = () => {
    if (this.props.listStatus.status === 'WAITING') {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
    const {params} = this.props;

    if (this.props.listStatus.data.length === 0) {
      return this.props.actions.listEvent({ eventId: params.eventId });
    }

    const contentId = this.props.listStatus.data[0]._id;

    return this.props.actions.listNewEvent({ eventId: params.eventId, contentId });
  }

  getProfile = () => {
    const eventId = this.props.params.eventId;
    const key = `${keyPrefix}${eventId}${keySuffix}`;
    const token = storage.get(key);

    this.props.actions.getProfile({ eventId, token });
  }

  componentWillUnmount() {
    clearTimeout(this.memoLoaderTimeoutId);
  }

  handleCreateEvent = (name, content) => {
    // TODO: create event with token
    const eventId = this.props.params.eventId;
    const key = `${keyPrefix}${eventId}${keySuffix}`;
    const token = storage.get(key);

    return this.props.actions.createEvent({ name, content, eventId, token })
      .then(() => {
        if (this.props.createStatus.status === 'SUCCESS') {
          this.loadNewMemo();
          return true;
        } else {
          /*
            Error code:
              1. Invalid token or empty token
              2. Content empty
              3. Invalid eventId              
          */
          const errorMessage = [
            'Please retry again. Something Broke!',
            'Please input content!',
            'Invalid event id'
          ];

          alert.error(errorMessage[this.props.createStatus.error - 1]);

          if (this.props.createStatus.error === 1) {
            setTimeout(() => {
              location.reload();
            }, 500);
            return true;
          } else if (this.props.createStatus.error === 2) {
            return false;
          } else if (this.props.createStatus.error === 3) {
            setTimeout(() => {
              browserHistory.push('/');
            }, 500);
            return true;
          }
        }
      });
  }

  handleLikeEvent = (contentId, isLike, index) => {
    const eventId = this.props.params.eventId;
    const key = `${keyPrefix}${eventId}${keySuffix}`;
    const token = storage.get(key);

    this.props.actions.likeEvent({ eventId, contentId, token, isLike, index })
      .then(() => {
        if (this.props.likeStatus.status === 'SUCCESS') {
          if (isLike) {
            alert.success('LIKE!');
          } else {
            alert.error('UNLIKE!');
          }

        } else {
          alert.error('Error! Please retry again!');
          setTimeout(() => {
            location.reload();
          }, 500);
        }
      });
  }

  handleEditProfile = (name) => {
    const eventId = this.props.params.eventId;
    const key = `${keyPrefix}${eventId}${keySuffix}`;
    const token = storage.get(key);

    this.props.actions.editProfile({ name, eventId, token })
      .then(() => {
        alert.success('edit profile ok');
      });
  }

  render() {
    const {params, location} = this.props;
    const re = /ask/;
    const isAsk = re.test(location.pathname);

    const eventId = this.props.params.eventId;
    const key = `${keyPrefix}${eventId}${keySuffix}`;
    const token = storage.get(key);

    const askView = (
      <Ask
        fetching={this.props.listStatus.status === 'WAITING'}
        onCreateEvent={this.handleCreateEvent}
        onLikeEvent={this.handleLikeEvent}
        data={this.props.listStatus.data}
        token={token}
        name={this.props.profileStatus.name}
        />);
    const profileView = (
      <Profile
        name={this.props.profileStatus.name}
        onEditProfile={this.handleEditProfile}
        />);

    return (
      <div>
        <EventHeader
          eventName={this.props.listStatus.eventName}
          eventId={params.eventId} />
        {isAsk ? askView : profileView}
      </div>
    );
  }
}

Event = connect(state => {
  return {
    createStatus: state.event.create,
    listStatus: state.event.list,
    likeStatus: state.event.like,
    profileStatus: state.event.profile,
    editProfileStatus: state.event.editProfile
  }
}, dispatch => {
  return {
    actions: bindActionCreators({
      createEvent: event.createEvent,
      listEvent: event.listEvent,
      listNewEvent: event.listNewEvent,
      likeEvent: event.likeEvent,
      getProfile: event.getProfile,
      editProfile: event.editProfile
    }, dispatch)
  }
})(Event);
export default Event;
import EVENTS from './ActionTypes/events';
import * as service from 'services/events';

export const createEvents = (params) => {
  return (dispatch) => {
    dispatch(beginCreateEvents());

    return service.createEvents(params)
      .then(response => {
        dispatch(createEventsSuccess());
      })
      .catch(err => {
        dispatch(createEventsFailure(err.response.data.code));
      });
  }
};

export const beginCreateEvents = () => {
  return {
    type: EVENTS.EVENTS_CREATE
  }
};

export const createEventsSuccess = () => {
  return {
    type: EVENTS.EVENTS_CREATE_SUCCESS
  }
};

export const createEventsFailure = (error) => {
  return {
    type: EVENTS.EVENTS_CREATE_FAILURE,
    error
  }
};

export const listEvents = () => {
  return (dispatch) => {
    dispatch(beginListEvents());

    return service.listEvents()
      .then(response => {
        dispatch(listEventsSuccess(response.data.events));
      })
      .catch(err => {
        dispatch(listEventsFailure());
      });
  }
};

export const beginListEvents = () => {
  return {
    type: EVENTS.EVENTS_LIST
  }
};

export const listEventsSuccess = (data) => {
  return {
    type: EVENTS.EVENTS_LIST_SUCCESS,
    data
  }
};

export const listEventsFailure = () => {
  return {
    type: EVENTS.EVENTS_LIST_FAILURE
  }
};
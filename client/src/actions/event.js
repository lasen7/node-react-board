import EVENT from './ActionTypes/event';
import * as service from 'services/event';

export const createEvent = (params) => {
  return (dispatch) => {
    dispatch(beginCreateEvent());

    return service.createEvent(params)
      .then(response => {
        dispatch(createEventSuccess());
      })
      .catch(err => {
        dispatch(createEventFailure(err.response.data.code));
      });
  }
};

export const beginCreateEvent = () => {
  return {
    type: EVENT.EVENT_CREATE
  }
};

export const createEventSuccess = () => {
  return {
    type: EVENT.EVENT_CREATE_SUCCESS
  }
};

export const createEventFailure = (error) => {
  return {
    type: EVENT.EVENT_CREATE_FAILURE,
    error
  }
};

export const listEvent = (params) => {
  return (dispatch) => {
    dispatch(beginListEvent());

    return service.listEvent(params)
      .then(response => {
        dispatch(listEventSuccess(
          response.data.eventName,
          response.data.contents,
          response.data.token));
      })
      .catch(err => {
        dispatch(listEventFailure(err.response.data.code));
      });
  }
};

export const beginListEvent = () => {
  return {
    type: EVENT.EVENT_LIST
  }
};

export const listEventSuccess = (eventName, data, token) => {
  return {
    type: EVENT.EVENT_LIST_SUCCESS,
    eventName,
    data,
    token
  }
};

export const listEventFailure = (error) => {
  return {
    type: EVENT.EVENT_LIST_FAILURE,
    error
  }
};

export const listNewEvent = (params) => {
  return (dispatch) => {
    dispatch(beginListEvent());

    return service.listNewEvent(params)
      .then(response => {
        dispatch(listEventSuccess(
          response.data.eventName,
          response.data.contents,
          response.data.token));
      })
      .catch(error => {
        dispatch(listEventFailure());
      });
  }
};
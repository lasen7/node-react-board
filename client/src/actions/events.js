import EVENTS from './ActionTypes/events';
import * as service from 'services/events';

/* 이벤트 생성 */

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

/* 이벤트 가져오기 */

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

/* 이벤트 삭제하기 */

export const beginRemoveEvents = () => {
  return {
    type: EVENTS.EVENTS_REMOVE
  }
};

export const removeEventsSuccess = (index) => {
  return {
    type: EVENTS.EVENTS_REMOVE_SUCCESS,
    index
  }
};

export const removeEventsFailure = () => {
  return {
    type: EVENTS.EVENTS_REMOVE_FAILURE
  }
};

export const removeEvents = (index, params) => {
  return (dispatch) => {
    dispatch(beginRemoveEvents());

    return service.removeEvents(params)
      .then(response => {
        dispatch(removeEventsSuccess(index));
      })
      .catch(err => {
        dispatch(removeEventsFailure());
      });
  }
};
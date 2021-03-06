import EVENT from './ActionTypes/event';
import * as service from 'services/event';

/* 게시판 글 생성 */

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

/* 게시판 글 읽기 */

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

/* 게시판 새 글 읽기 */

export const beginListNewEvent = () => {
  return {
    type: EVENT.EVENT_LIST_NEW
  }
};

export const listNewEventSuccess = (eventName, data, token) => {
  return {
    type: EVENT.EVENT_LIST_NEW_SUCCESS,
    eventName,
    data,
    token
  }
};

export const listNewEventFailure = () => {
  return {
    type: EVENT.EVENT_LIST_NEW_FAILURE
  }
};

export const listNewEvent = (params) => {
  return (dispatch) => {
    dispatch(beginListNewEvent());

    return service.listNewEvent(params)
      .then(response => {
        dispatch(listNewEventSuccess(
          response.data.eventName,
          response.data.contents,
          response.data.token));
      })
      .catch(error => {
        dispatch(listNewEventFailure());
      });
  }
};

/* 게시판 글 좋아요 */

export const beginLikeEvent = () => {
  return {
    type: EVENT.EVENT_LIKE
  }
};

export const likeEventSuccess = (token, isLike, index) => {
  return {
    type: EVENT.EVENT_LIKE_SUCCESS,
    token,
    isLike,
    index
  }
};

export const likeEventFailure = (error) => {
  return {
    type: EVENT.EVENT_LIKE_FAILURE,
    error
  }
};

export const likeEvent = (params) => {
  return (dispatch) => {
    dispatch(beginLikeEvent());

    return service.likeEvent(params)
      .then(response => {
        dispatch(likeEventSuccess(params.token, params.isLike, params.index));
      })
      .catch(error => {
        dispatch(likeEventFailure(error.response.data.code));
      });
  }
};

/* 게시판 프로필 정보 얻기 */

export const beginGetProfile = () => {
  return {
    type: EVENT.EVENT_PROFILE
  }
};

export const getProfileSuccess = (name) => {
  return {
    type: EVENT.EVENT_PROFILE_SUCCESS,
    name
  }
};

export const getProfileFailure = () => {
  return {
    type: EVENT.EVENT_PROFILE_FAILURE
  }
};

export const getProfile = (params) => {
  return (dispatch) => {
    dispatch(beginGetProfile());

    return service.getProfile(params)
      .then(response => {
        dispatch(getProfileSuccess(response.data.name));
      })
      .catch(error => {
        dispatch(getProfileFailure());
      });
  }
};

/* 게시판 프로필 수정 */

export const beginEditProfile = () => {
  return {
    type: EVENT.EVENT_EDIT_PROFILE
  }
};

export const editProfileSuccess = (data, name) => {
  return {
    type: EVENT.EVENT_EDIT_PROFILE_SUCCESS,
    data,
    name
  }
};

export const editProfileFailure = () => {
  return {
    type: EVENT.EVENT_EDIT_PROFILE_FAILURE
  }
};

export const editProfile = (params) => {
  return (dispatch) => {
    dispatch(beginEditProfile());

    return service.editProfile(params)
      .then(response => {
        dispatch(editProfileSuccess(response.data.data, params.name));
      })
      .catch(error => {
        dispatch(editProfileFailure());
      });
  }
};
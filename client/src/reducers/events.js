import EVENTS from 'actions/ActionTypes/events';

const initialState = {
  create: {
    status: 'INIT',
    error: -1
  },
  list: {
    status: 'INIT',
    data: []
  },
  remove: {
    status: 'INIT'
  }
};

function events(state = initialState, action) {
  switch (action.type) {
    case EVENTS.EVENTS_CREATE:
      return {
        ...state,
        create: {
          ...state.create,
          status: 'WAITING',
          error: -1
        }
      }
    case EVENTS.EVENTS_CREATE_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          status: 'SUCCESS'
        }
      }
    case EVENTS.EVENTS_CREATE_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          status: 'FAILURE',
          error: action.error
        }
      }
    case EVENTS.EVENTS_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'WAITING'
        }
      }
    case EVENTS.EVENTS_LIST_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'SUCCESS',
          data: action.data
        }
      }
    case EVENTS.EVENTS_LIST_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'FAILURE'
        }
      }
    case EVENTS.EVENTS_REMOVE:
      return {
        ...state,
        remove: {
          ...state.remove,
          status: 'WAITING'
        }
      }
    case EVENTS.EVENTS_REMOVE_SUCCESS:
      return {
        ...state,
        remove: {
          ...state.remove,
          status: 'SUCCESS'
        },
        list: {
          ...state.list,
          data: [
            ...state.list.data.slice(0, action.index),
            ...state.list.data.slice(action.index + 1)
          ]
        }
      }
    case EVENTS.EVENTS_REMOVE_FAILURE:
      return {
        ...state,
        remove: {
          ...state.remove,
          status: 'FAILURE'
        }
      }
    default:
      return state;
  }
}

export default events;
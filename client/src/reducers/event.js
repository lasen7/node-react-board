import EVENT from 'actions/ActionTypes/event';

const initialState = {
  create: {
    status: 'INIT',
    error: -1
  },
  list: {
    status: 'INIT',
    data: [],
    eventName: '',
    token: '',
    error: -1
  },
  star: {
    status: 'INIT',
    error: -1
  }
};

function event(state = initialState, action) {
  switch (action.type) {
    case EVENT.EVENT_CREATE:
      return {
        ...state,
        create: {
          ...state.create,
          status: 'WAITING',
          error: -1
        }
      }
    case EVENT.EVENT_CREATE_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          status: 'SUCCESS',
        }
      }
    case EVENT.EVENT_CREATE_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          status: 'FAILURE',
          error: action.error
        }
      }
    case EVENT.EVENT_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'WAITING',
          error: -1
        }
      }
    case EVENT.EVENT_LIST_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'SUCCESS',
          data: [
            ...state.list.data,
            ...action.data
          ],
          token: action.token,
          eventName: action.eventName
        }
      }
    case EVENT.EVENT_LIST_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'FAILURE',
          error: action.error
        }
      }
    case EVENT.EVENT_LIKE:
      return {
        ...state,
        star: {
          ...state.star,
          status: 'WAITING',
          error: -1
        }
      }
    case EVENT.EVENT_LIKE_SUCCESS:
      debugger
      let data = {
        ...state.list.data[action.index]
      };

      let copyData = JSON.parse(JSON.stringify(data));

      if (action.isLike) {
        copyData.like.push(action.token);
      } else {
        let index = copyData.like.indexOf(action.token);
        if (index >= 0) {
          copyData.like.splice(index, 1);
        }
      }

      if (copyData.token !== action.token) {
        copyData.token = action.token;
      }

      return {
        ...state,
        star: {
          ...state.star,
          status: 'SUCCESS',
        },
        list: {
          data: [
            ...state.list.data.slice(0, action.index),
            copyData,
            ...state.list.data.slice(action.index + 1)
          ]
        }
      }
    case EVENT.EVENT_LIKE_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          status: 'FAILURE',
          error: action.error
        }
      }
    default:
      return state;
  }
}

export default event;
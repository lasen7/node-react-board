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
  like: {
    status: 'INIT',
    error: -1
  },
  profile: {
    status: 'INIT',
    name: ''
  },
  editProfile: {
    status: 'INIT'
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
          error: -1,
          data: []
        }
      }
    case EVENT.EVENT_LIST_NEW:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'WAITING',
          error: -1
        }
      }
    case EVENT.EVENT_LIST_SUCCESS:
    case EVENT.EVENT_LIST_NEW_SUCCESS:
      let data = [
        ...state.list.data,
        ...action.data
      ];

      // sorting
      data = data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      return {
        ...state,
        list: {
          ...state.list,
          status: 'SUCCESS',
          data: data,
          token: action.token,
          eventName: action.eventName
        }
      }
    case EVENT.EVENT_LIST_FAILURE:
    case EVENT.EVENT_LIST_NEW_FAILURE:
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
        like: {
          ...state.like,
          status: 'WAITING',
          error: -1
        }
      }
    case EVENT.EVENT_LIKE_SUCCESS:
      let originData = {
        ...state.list.data[action.index]
      };

      let copyData = JSON.parse(JSON.stringify(originData));

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
        like: {
          ...state.like,
          status: 'SUCCESS',
        },
        list: {
          ...state.list,
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
        like: {
          ...state.like,
          status: 'FAILURE',
          error: action.error
        }
      }
    case EVENT.EVENT_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          status: 'WAITING'
        }
      }
    case EVENT.EVENT_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          status: 'SUCCESS',
          name: action.name
        }
      }
    case EVENT.EVENT_PROFILE_FAILURE:
      return {
        ...state,
        profile: {
          ...state.profile,
          status: 'FAILURE'
        }
      }
    case EVENT.EVENT_EDIT_PROFILE:
      return {
        ...state,
        editProfile: {
          ...state.editProfile,
          status: 'WAITING'
        }
      }
    case EVENT.EVENT_EDIT_PROFILE_SUCCESS:
      var updateData = state.list.data.map((item) => {
        let findItem = action.data.find(o => o._id === item._id);
        if (findItem) {
          return {
            ...item,
            writer: findItem.writer
          }
        } else {
          return {
            ...item
          }
        }
      });

      return {
        ...state,
        editProfile: {
          ...state.editProfile,
          status: 'SUCCESS'
        },
        profile: {
          ...state.profile,
          name: action.name
        },
        list: {
          ...state.list,
          data: updateData
        }
      }
    case EVENT.EVENT_EDIT_PROFILE_FAILURE:
      return {
        ...state,
        editProfile: {
          ...state.editProfile,
          status: 'FAILURE'
        }
      }
    default:
      return state;
  }
}

export default event;
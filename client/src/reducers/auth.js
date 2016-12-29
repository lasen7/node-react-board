import AUTH from 'actions/ActionTypes/auth';

const initialState = {
  register: {
    status: 'INIT',
    error: -1
  },
  login: {
    status: 'INIT'
  },
  status: {
    isLoggedIn: false,
    name: ''
  }
};

function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH.AUTH_REGISTER:
      return {
        ...state,
        register: {
          ...state.register,
          status: 'WAITING',
          error: -1
        }
      };
    case AUTH.AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        register: {
          ...state.register,
          status: 'SUCCESS'
        }
      };
    case AUTH.AUTH_REGISTER_FAILURE:
      return {
        ...state,
        register: {
          ...state.register,
          status: 'FAILURE',
          error: action.error
        }
      };
    case AUTH.AUTH_LOGIN:
      return {
        ...state,
        login: {
          ...state.login,
          status: 'WAITING'
        }
      };
    case AUTH.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          status: 'SUCCESS'
        },
        status: {
          ...state.status,
          isLoggedIn: true,
        }
      };
    case AUTH.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        login: {
          ...state.login,
          status: 'FAILURE'
        }
      };
    case AUTH.AUTH_GET_STATUS:
      return {
        ...state,
        status: {
          ...state.status
        }
      };
    case AUTH.AUTH_GET_STATUS_SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          isLoggedIn: true,
          name: action.name
        }
      };
    case AUTH.AUTH_GET_STATUS_FAILURE:
      return {
        ...state,
        status: {
          ...state, status,
          isLoggedIn: false
        }
      };
    case AUTH.AUTH_LOGOUT:
      return {
        ...state,
        status: {
          ...state.status,
          isLoggedIn: false,
          name: ''
        }
      }
    default:
      return state;
  }
}

export default auth;
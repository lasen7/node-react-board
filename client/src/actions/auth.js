import AUTH from './ActionTypes/auth';
import * as service from 'services/auth';

/* 가입하기 */

export const beginRegister = () => {
  return {
    type: AUTH.AUTH_REGISTER
  }
};

export const registerSuccess = () => {
  return {
    type: AUTH.AUTH_REGISTER_SUCCESS
  }
};

export const registerFailure = (error) => {
  return {
    type: AUTH.AUTH_REGISTER_FAILURE,
    error
  }
};

export const register = (params) => {
  return (dispatch) => {
    dispatch(beginRegister());

    return service.register(params)
      .then(response => {
        dispatch(registerSuccess());
      })
      .catch(error => {
        dispatch(registerFailure(error.response.data.code));
      });
  };
};

/* 로그인 하기 */

export const beginLogin = () => {
  return {
    type: AUTH.AUTH_LOGIN
  }
};

export const loginSuccess = () => {
  return {
    type: AUTH.AUTH_LOGIN_SUCCESS,
  }
};

export const loginFailure = () => {
  return {
    type: AUTH.AUTH_LOGIN_FAILURE
  }
};

export const login = (params) => {
  return (dispatch) => {
    dispatch(beginLogin());

    return service.login(params)
      .then(response => {
        dispatch(loginSuccess());
      })
      .catch(() => {
        dispatch(loginFailure());
      });
  }
};

/* 세션 정보 확인 */

export const beginGetStatus = () => {
  return {
    type: AUTH.AUTH_GET_STATUS
  }
};

export const getStatusSuccess = (name) => {
  return {
    type: AUTH.AUTH_GET_STATUS_SUCCESS,
    name
  }
};

export const getStatusFailure = () => {
  return {
    type: AUTH.AUTH_GET_STATUS_FAILURE
  }
};

export const getStatus = () => {
  return (dispatch) => {
    dispatch(beginGetStatus());

    return service.getStatus()
      .then(response => {
        dispatch(getStatusSuccess(response.data.status.name));
      })
      .catch(() => {
        dispatch(getStatusFailure());
      });
  }
};

/* 로그아웃 */

export const logoutSuccess = () => {
  return {
    type: AUTH.AUTH_LOGOUT
  }
};

export const logout = () => {
  return (dispatch) => {
    return service.logout()
      .then(response => {
        dispatch(logoutSuccess());
      });
  }
}
import request from 'utils/request';

export const register = ({
  name,
  email,
  password
}) => {
  return request({
    url: '/api/account/signup',
    method: 'post',
    data: {
      name,
      email,
      password
    }
  });
};

export const login = ({
  email,
  password
}) => {
  return request({
    url: '/api/account/signin',
    method: 'post',
    data: {
      email,
      password
    }
  });
};

export const getStatus = () => {
  return request({
    url: '/api/account/getStatus',
    method: 'get'
  });
};

export const logout = () => {
  return request({
    url: '/api/account/logout',
    method: 'post'
  });
};
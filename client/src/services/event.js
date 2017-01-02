import request from 'utils/request';

export const createEvent = ({
  name,
  content,
  eventId,
  token
}) => {
  return request({
    url: '/api/event/' + eventId,
    method: 'post',
    data: {
      name,
      content
    },
    config: {
      headers: { 'x-access-token': token }
    }
  });
};

export const listEvent = ({
  eventId
}) => {
  return request({
    url: '/api/event/' + eventId,
    method: 'get'
  });
};

export const listNewEvent = ({
  eventId,
  contentId
}) => {
  return request({
    url: `/api/event/${eventId}/new/${contentId}`,
    method: 'get'
  });
};

export const likeEvent = ({
  eventId,
  contentId,
  token,
  isLike
}) => {
  return request({
    url: `/api/event/${eventId}/like/${contentId}?q=${isLike ? 'like' : 'unlike'}`,
    method: 'put',
    config: {
      headers: { 'x-access-token': token }
    }
  });
};

export const getProfile = ({
  eventId,
  token
}) => {
  return request({
    url: `/api/event/${eventId}/profile`,
    method: 'get',
    config: {
      headers: { 'x-access-token': token }
    }
  });
};

export const editProfile = ({
  eventId,
  token,
  name
}) => {
  return request({
    url: `/api/event/${eventId}/profile`,
    method: 'put',
    data: {
      name
    },
    config: {
      headers: { 'x-access-token': token }
    }
  });
};
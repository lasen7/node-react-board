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
    url: '/api/event/' + eventId + '/new/' + contentId,
    method: 'get'
  });
};
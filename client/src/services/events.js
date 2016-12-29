import request from 'utils/request';

export const createEvents = ({
  eventName,
  eventId
}) => {
  return request({
    url: '/api/events',
    method: 'post',
    data: {
      eventName,
      eventId
    }
  });
};

export const listEvents = () => {
  return request({
    url: '/api/events',
    method: 'get'
  });
};
import Event from '../models/event';
import { validateAddEvents, validateEventId } from '../utils/validation';

/**
 * 이벤트 생성
 * Body: { eventName, eventId }
 * Error:
 *  - 1: invalid event name
 *  - 2: invalid event id
 *  - 3: duplicated event id
 */
export const addEvents = (req, res, next) => {
  req.body.eventId = (+req.body.eventId);

  const validate = validateAddEvents(req.body);
  if (validate.error.length > 0) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: validate.error[0].code
    });
  }

  Event.findEventById(req.body.eventId)
    .then(event => {
      if (event) {
        let error = new Error();
        error.message = 'The eventId already exists!';
        error.code = 403;
        error.errorCode = 3;
        throw error;
      } else {
        return Event.addEvent(req.body.eventId, req.body.eventName, req.user.email);
      }
    })
    .then(doc => {
      res.send({ msg: 'Success' });
    })
    .catch(error => {
      return next(error);
    });
};

/**
 * 이벤트 목록 보기
 */
export const getEvents = (req, res, next) => {
  Event.findEventsByEmail(req.user.email)
    .then(docs => {
      let result = {};
      result.msg = 'Success';
      result.events = docs;
      res.send(result);
    })
    .catch(error => {
      return next(error);
    });
};

/**
 * 이벤트 검색
 */
export const findEvents = (req, res, next) => {
  if (!req.query.q) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 0
    });
  }

  Event.findEventsByQuery(req.user.email, req.query.q)
    .then(docs => {
      let result = {};
      result.msg = 'Success';
      result.events = docs;
      res.send(result);
    })
    .catch(error => {
      return next(error);
    });
};

/**
 * 이벤트 삭제
 * Body: { eventId }
 */
export const deleteEvents = (req, res, next) => {
  if (validateEventId(req.body).error.length > 0) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 0
    });
  }

  Event.findEventById(req.body.eventId)
    .then(doc => {
      if (doc && (doc.email === req.user.email)) {
        return Event.deleteEvent(req.body.eventId);
      }

      let error = new Error();
      error.message = 'Not Acceptable';
      error.code = 406;
      throw error;
    })
    .then(result => {
      res.send({ msg: 'Success' });
    })
    .catch(error => {
      return next(error);
    });
};
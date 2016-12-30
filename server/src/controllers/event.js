import Event from '../models/event';
import Profile from '../models/profile';
import uuid from 'uuid/v1';
import mongoose from 'mongoose';
import {
  validateAddEvent,
  validateEventId,
  validateObjectId,
  validateEditProfile,
  validateUUID
} from '../utils/validation';

/**
 * 게시판 글 작성
 * Header: { x-access-token }
 * Body: { name, content } 
 * Error:
 *   1: Invalid token
 *   2: Content empty
 *   3: Invalid eventId 
 */
export const addContent = (req, res, next) => {
  if (validateAddEvent(req.body).error.length > 0) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 2
    });
  }

  // parse int
  req.params.eventId = (+req.params.eventId);

  if (validateEventId({ eventId: req.params.eventId }).error.length > 0) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 3
    });
  }

  Event.addContent(req.params.eventId, req.body.name, req.body.content, req.token)
    .then(result => {
      if (result.nModified > 0) {
        res.send({ msg: 'Success' });
      } else {
        res.send({ msg: 'Not added' });
      }
    })
    .catch(error => {
      return next(error);
    });
};

/**
 * 게시판 글 가져오기
 * Params: { eventId }
 */
export const getContent = (req, res, next) => {
  // parse int
  req.params.eventId = (+req.params.eventId);

  if (validateEventId({ eventId: req.params.eventId }).error.length > 0) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 0
    });
  }

  Event.getContents(req.params.eventId)
    .then(docs => {
      if (!docs) {
        return res.status(403).send({
          msg: 'Not found event',
          code: 1
        });
      }

      let result = {};
      result.msg = 'Success';
      result.eventName = docs.eventName,
        result.contents = docs.contents;
      result.token = req.token;
      res.send(result);
    })
    .catch(error => {
      return next(error);
    });
};

/**
 * 게시판 새글 가져오기
 * Params: { eventId, contentId }
 */
export const getNewContent = (req, res, next) => {
  // parse int
  req.params.eventId = (+req.params.eventId);

  if (validateEventId({ eventId: req.params.eventId }).error.length > 0) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 0
    });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.contentId)) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 0
    });
  }

  Event.getNewContents(req.params.eventId, req.params.contentId)
    .then(docs => {
      if (!docs || docs.length === 0) {
        return res.status(403).send({
          msg: 'Not found event',
          code: 1
        });
      }

      console.log(docs);

      let result = {};
      result.msg = 'Success';
      result.eventName = docs[0].eventName;
      result.contents = [];

      for (let doc of docs) {
        result.contents.push(doc.contents);
      }

      result.token = req.token;
      res.send(result);
    })
    .catch(error => {
      return next(error);
    });
};

/**
 * 게시판 좋아요
 * Params: { eventId, contentId }
 * Header: { x-access-token }
 * QueryString: { req.query.q: like/unlike }
 */
export const likeContent = (req, res, next) => {
  // parse int
  req.params.eventId = (+req.params.eventId);

  if (validateEventId({ eventId: req.params.eventId }).error.length > 0) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 0
    });
  }

  if (!req.query.q) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 0
    });
  } else {
    req.query.q = (req.query.q == 'like') ? true : false;
  }

  // validate ObjectId
  if (!validateObjectId(req.params.contentId)) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 1
    });
  }

  Event.likeContent(req.params.eventId, req.params.contentId, req.token, req.query.q)
    .then(result => {
      if (result.nModified > 0) {
        res.send({ msg: 'Success' });
      } else {
        res.send({ msg: 'Not liked' });
      }
    })
    .catch(error => {
      return next(error);
    });
};

/**
 * 게시판 프로필 이름 변경
 * Params: { eventId }
 * Header: { x-access-token }
 * Body: { name }
 */
export const editProfile = (req, res, next) => {
  req.params.eventId = (+req.params.eventId);

  if (validateEventId({ eventId: req.params.eventId }).error.length > 0) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 0
    });
  }

  if (validateEditProfile(req.body).error.length > 0) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 0
    });
  }

  Profile.editProfile(req.params.eventId, req.body.name, req.token)
    .then(result => {
      return Event.editWriter(req.params.eventId, req.body.name);
    })
    .then(result => {
      if (!result) {
        return res.status(400).send({ msg: 'Not found event' });
      }

      res.send({ msg: 'Success' });
    })
    .catch(error => {
      return next(error);
    });
};

/**
 * 프로필 가져오기
 * Params: { eventId }
 * Header: { x-access-token }
 */
export const getProfile = (req, res, next) => {
  req.params.eventId = (+req.params.eventId);

  if (validateEventId({ eventId: req.params.eventId }).error.length > 0) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 0
    });
  }

  Profile.getProfile(req.params.eventId, req.token)
    .then(doc => {
      let result = {};
      result.msg = 'Success';
      result.name = doc ? doc.name : '';
      result.token = req.token;
      res.send(result);
    })
    .catch(error => {
      return next(error);
    });
};

/**
 * If token doesn't exist in the header, create token
 */
export const findAndCreateToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    req.token = uuid();
    return next();
  }

  if (!validateUUID(token)) {
    let error = new Error();
    error.message = 'The token is invalid';
    error.code = 400;
    return next(error);
  }

  req.token = token;
  return next();
};

/**
 * Middleware function to find token in header
 */
export const findToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token || !validateUUID(token)) {
    let error = new Error();
    error.message = 'The token is invalid';
    error.code = 400;
    error.errorCode = 1;
    return next(error);
  }

  req.token = token;
  return next();
};
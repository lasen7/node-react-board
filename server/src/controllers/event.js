import Event from '../models/event';
import Profile from '../models/profile';
import uuid from 'uuid/v1';
import {
  validateAddEvent,
  validateEventId,
  validateObjectId,
  validateEditProfile
} from '../utils/validation';

/**
 * 게시판 글 작성
 * Header: { x-access-token }
 * Body: { name, content } 
 */
export const addContent = (req, res, next) => {
  if (validateAddEvent(req.body).error.length > 0) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 0
    });
  }

  // parse int
  req.params.eventId = (+req.params.eventId);

  if (validateEventId({ eventId: req.params.eventId }).error.length > 0) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 0
    });
  }

  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 1
    });
  }

  Event.addContent(req.params.eventId, req.body.name, req.body.content, token)
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
      result.contents = docs.contents;
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

  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 1
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

  Event.likeContent(req.params.eventId, req.params.contentId, token, req.query.q)
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

  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 1
    });
  }

  Profile.editProfile(req.params.eventId, req.body.name, token)
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
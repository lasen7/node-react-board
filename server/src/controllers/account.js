import Account from '../models/account';

import { validateSignupBody, validateSigninBody } from '../utils/validation';
import { generateHash, compareHash } from '../utils/bcrypt';

/**
 * 회원가입
 * Body: { name, email, password }
 */
export const signup = (req, res, next) => {
  if (validateSignupBody(req.body).error.length > 0) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 0
    });
  }

  Account.findAccountByEmail(req.body.email)
    .then(account => {
      if (account) {
        let error = new Error();
        error.message = 'The user already exists!';
        error.code = 403;
        error.errorCode = 1;
        throw error;
      } else {
        return generateHash(req.body.password);
      }
    })
    .then(hash => {
      return Account.addAccount(req.body.email, req.body.name, hash);
    })
    .then(doc => {
      res.send({ msg: 'Success' });
    })
    .catch(err => {
      next(err);
    });
};

/**
 * 로그인
 * Body: { email, password }
 */
export const signin = (req, res, next) => {
  if (validateSigninBody(req.body).error.length > 0) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: 0
    });
  }

  Account.findAccountByEmail(req.body.email)
    .then(account => {
      if (!account) {
        let error = new Error();
        error.message = 'Invalid Auth';
        error.code = 400;
        throw error;
      } else {
        return compareHash(account.password, req.body.password);
      }
    })
    .then(result => {
      if (!result) {
        let error = new Error();
        error.message = 'Invalid Auth';
        error.code = 400;
        throw error;
      } else {
        res.send({ msg: 'Success' });
      }
    })
    .catch(err => {
      next(err);
    });
};

export const logout = (req, res, next) => {
  res.send('ok');
};
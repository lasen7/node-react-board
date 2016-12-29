import Account from '../models/account';
import passport from 'passport';

import { validateSignupBody, validateSigninBody } from '../utils/validation';

/**
 * 회원가입
 * Body: { name, email, password }
 */
export const signup = (req, res, next) => {
  const validate = validateSignupBody(req.body);
  if (validate.error.length > 0) {
    return res.status(400).send({
      msg: 'Invalid Request',
      code: validate.error[0].code
    });
  }

  passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      return next(err);
    }

    // call serializeUser 
    // req.login(user, err => {
    //   if (err) {
    //     return next(err);
    //   }

    //   res.send({ msg: 'Success' });
    // });

    res.send({ msg: 'Success' });
  })(req, res, next);
};

/**
 * 로그인
 * Body: { email, password }
 */
export const signin = (req, res, next) => {
  const validate = validateSigninBody(req.body);
  if (validate.error.length > 0) {
    return res.status(400).send({
      msg: 'Invalid Request',
      //code: validate.error[0].code
    });
  }

  passport.authenticate('local-signin', (err, user, info) => {
    if (err) {
      return next(err);
    }

    req.login(user, err => {
      if (err) {
        return next(err);
      }

      res.send({ msg: 'Success', name: user.name });
    });
  })(req, res, next);
};

export const logout = (req, res, next) => {
  req.logout();
  res.send({ msg: 'Success' });
};

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    let error = new Error();
    error.message = 'Unauthorized';
    error.code = 401;
    return next(error);
  }
};

/**
 * 세션 확인
 */
export const getStatus = (req, res, next) => {
  res.send({ status: req.user });
};
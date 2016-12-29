import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import Account from '../models/account';
import { generateHash, compareHash } from '../utils/bcrypt';

passport.serializeUser((user, done) => {
  console.log('serialize');
  // save the email and name in db
  done(null, {
    email: user.email,
    name: user.name
  });
});

passport.deserializeUser((user, done) => {
  console.log('deserialize');
  done(null, user);
});

passport.use(
  'local-signup',
  new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email', passwordField: 'password' },
    (req, email, password, done) => {
      Account.findAccountByEmail(email)
        .then(account => {
          if (account) {
            let error = new Error();
            error.message = 'The user already exists!';
            error.code = 403;
            error.errorCode = 4;
            throw error;
          } else {
            return generateHash(password);
          }
        })
        .then(hash => {
          return Account.addAccount(email, req.body.name, hash);
        })
        .then(doc => {
          return done(null, doc);
        })
        .catch(error => {
          done(error);
        });
    }));

passport.use(
  'local-signin',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    (email, password, done) => {

      let _account = null;

      Account.findAccountByEmail(email)
        .then(account => {
          if (!account) {
            let error = new Error();
            error.message = 'Invalid Auth';
            error.code = 400;
            throw error;
          } else {
            _account = account;
            return compareHash(account.password, password);
          }
        })
        .then(result => {
          if (!result) {
            let error = new Error();
            error.message = 'Invalid Auth';
            error.code = 400;
            throw error;
          } else {
            return done(null, _account);
          }
        })
        .catch(error => {
          return done(error);
        });
    })
);
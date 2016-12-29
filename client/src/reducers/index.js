import { combineReducers } from 'redux';
import auth from './auth';
import events from './events';

const reducers = {
  auth,
  events
};

export default combineReducers(reducers);
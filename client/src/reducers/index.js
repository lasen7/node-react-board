import { combineReducers } from 'redux';
import auth from './auth';
import events from './events';
import event from './event';

const reducers = {
  auth,
  events,
  event,
};

export default combineReducers(reducers);
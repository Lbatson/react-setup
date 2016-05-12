import { combineReducers } from 'redux';
import auth from './Auth/reducer';
import notification from './Notification/reducer';

export default combineReducers({
  auth,
  notification
});

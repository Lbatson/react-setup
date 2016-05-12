import { AUTH, AUTH_SUCCESS, AUTH_FAILURE, AUTH_RESET } from './actions';

// utility functions for storing auth token in localStorage
function setToken(token) {
  return window.localStorage ? window.localStorage.setItem('token', token) : null;
}

function getToken() {
  return window.localStorage ? window.localStorage.getItem('token') : null;
}

function removeToken() {
  return window.localStorage ? window.localStorage.clear() : null;
}

// define initial state of all possible properties
export const initialState = () => ({
  error: false,
  loading: false,
  profile: {},
  token: getToken()
});

export default function reducer(state = initialState(), action) {
  // modify state based on action types
  switch (action.type) {
    case AUTH:
      return Object.assign({}, state, {
        loading: true,
        error: false
      });
    case AUTH_SUCCESS:
      setToken(action.token);
      return Object.assign({}, state, {
        loading: false,
        profile: action.profile,
        token: action.token
      });
    case AUTH_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    case AUTH_RESET:
      removeToken();
      return initialState();
    default:
      return state;
  }
}

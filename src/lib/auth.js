import promise from 'es6-promise'
import fetch from 'isomorphic-fetch';
promise.polyfill();

// action types
export const AUTH = 'AUTH';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_RESET = 'AUTH_RESET';

// action creators
function request() {
  return {
    type: AUTH
  };
}

function success(token) {
  return {
    type: AUTH_SUCCESS,
    token
  };
}

function failure(error) {
  return {
    type: AUTH_FAILURE,
    error
  };
}

export function reset() {
  return {
    type: AUTH_RESET
  };
}

export function login(params) {
  const options = {
    method: 'post',
    body: JSON.stringify(params)
  };

  return dispatch => {
    dispatch(request());
    return fetch('http://localhost:4000/api/v1/login', options)
      .then(res => res.json())
      .then(json => dispatch(success(json)))
      .catch(err => {
        console.log(err);
        dispatch(failure(err));
      });
  }
}

export function reducer(state = {}, action) {
  // modify state based on action types
  switch (action.type) {
    case AUTH:
      return Object.assign({}, state, {
        loading: true,
        error: false
      });
    case AUTH_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        token: action.token
      });
    case AUTH_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    case AUTH_RESET:
      return Object.assign({}, state, {
        loading: false,
        error: false
      });
    default:
      return state;
  }
}

import promise from 'es6-promise'
import fetch from 'isomorphic-fetch';
promise.polyfill();

// action types
export const AUTH = 'AUTH';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_RESET = 'AUTH_RESET';

// action creators
function requestAuth() {
  return {
    type: AUTH
  };
}

function successAuth(token) {
  return {
    type: AUTH_SUCCESS,
    token
  };
}

function failAuth(error) {
  return {
    type: AUTH_FAILURE,
    error
  };
}

export function resetAuth() {
  return {
    type: AUTH_RESET
  };
}

export function authenticate(params) {
  const options = {
    method: 'post',
    body: JSON.stringify(params)
  };

  return dispatch => {
    dispatch(requestAuth());
    return fetch('http://localhost:4000/api/v1/login', options)
      .then(res => res.json())
      .then(json => dispatch(successAuth(json)))
      .catch(err => {
        console.log(err);
        dispatch(failAuth(err));
      });
  }
}

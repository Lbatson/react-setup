import http from '../http';

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

export function success(data) {
  return {
    type: AUTH_SUCCESS,
    profile: data.profile,
    token: data.token
  };
}

export function failure(error) {
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

export function logout() {
  return reset();
}

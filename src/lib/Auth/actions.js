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

function success(data) {
  return {
    type: AUTH_SUCCESS,
    token: data.token
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
  return dispatch => {
    // TODO remove conditional after implementing login service. this is only for testing
    if (params.username === 'username' && params.password === 'password') {
      dispatch(success({ token: 'userToken' }));
    } else {
      dispatch(request());
      return http
        .postRequest('/sessions/create', params)
        .then(data => dispatch(success(data)))
        .catch(err => dispatch(failure(err.message)));
    }
  };
}

export function logout() {
  return reset();
}

import axios from 'axios';
const http = axios.create({
  baseURL: 'http://192.168.99.100:3000'
});

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
    token: data.id_token
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
    dispatch(request());
    return http
      .post('/sessions/create', params)
      .then(res => dispatch(success(res.data)))
      .catch(err => dispatch(failure(err.data.message)));
  }
}

export function logout() {
  return reset();
}

import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import querystring from 'querystring';
promise.polyfill();

const baseURL = process.env.BASE_URL || 'http://localhost';
const options = {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

// TODO: temp workaround for lack of timeout with fetch API
const timeout = p => (
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Network timeout')), 5000);
    p.then(resolve, reject);
  })
);

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res.data;
  }

  const error = new Error(res.data.message);
  error.message = res.data.message;
  throw error;
}

function parseJSON(res) {
  return res
    .json()
    .then(json => {
      res.data = json;
      return res;
    });
}

function request(method, endpoint, data) {
  options.method = method;
  options.body = JSON.stringify(data);

  // TODO: remove timeout when implemented in fetch API
  return timeout(fetch(`${baseURL}${endpoint}`, options))
    .then(parseJSON)
    .then(checkStatus);
}

function getRequest(endpoint, queryParams) {
  const queryString = querystring.stringify(queryParams);
  const url = queryString ? `${endpoint}?${queryString}` : endpoint;
  return request('get', url);
}

function postRequest(endpoint, data) {
  return request('post', endpoint, data);
}

function putRequest(endpoint, data) {
  return request('put', endpoint, data);
}

function deleteRequest(endpoint, data) {
  return request('delete', endpoint, data);
}

export default {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
};

import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import querystring from 'querystring';
promise.polyfill();

const baseURL = 'http://192.168.99.100:3000';
const options = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res.data;
  } else {
    const error = new Error(res.data.message);
    error.message = res.data.message;
    throw error;
  }
}

function parseJSON(res) {
  return res
    .json()
    .then((json) => {
      res.data = json;
      return res;
    });
}

function request(method, endpoint, data) {
  options.method = method;
  options.body = JSON.stringify(data);

  return fetch(`${baseURL}${endpoint}`, options)
    .then(parseJSON)
    .then(checkStatus)
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

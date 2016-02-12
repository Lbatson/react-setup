import { AUTH, AUTH_SUCCESS, AUTH_FAILURE, AUTH_RESET } from '../actions';

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
      return {};
    default:
      return state;
  }
}

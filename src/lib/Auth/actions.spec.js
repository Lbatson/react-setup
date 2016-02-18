import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import * as actions from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {
  it('creates AUTH_SUCCESS with valid login()', (done) => {
    const expectedActions = [
      { type: actions.AUTH },
      { type: actions.AUTH_SUCCESS, token: 'test' }
    ];
    const store = mockStore({}, expectedActions, done);

    nock('http://192.168.99.100:3000/')
      .post('/sessions/create')
      .reply(201, {
        id_token: 'test'
      });

    store.dispatch(actions.login({username: 'test', password: 'test'}));
  });

  it('creates AUTH_FAILURE with invalid login()', (done) => {
    const expectedActions = [
      { type: actions.AUTH },
      { type: actions.AUTH_FAILURE, error: 'Invalid username or password' }
    ];
    const store = mockStore({}, expectedActions, done);

    nock('http://192.168.99.100:3000/')
      .post('/sessions/create')
      .reply(401, {
        message: 'Invalid username or password'
      });

    store.dispatch(actions.login({username: 'test', password: 'test'}));
  });

  it('creates AUTH_RESET with logout()', () => {
    expect(actions.logout()).toEqual({ type: actions.AUTH_RESET });
  });
});

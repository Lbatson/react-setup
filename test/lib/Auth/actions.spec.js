import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import nock from 'nock';
import * as actions from '../../../src/lib/Auth/actions';

const baseURL = 'http://localhost';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {
  it('creates AUTH_SUCCESS with valid login()', () => {
    nock(baseURL)
      .post('/sessions/create')
      .reply(201, {
        token: 'test'
      });

    const store = mockStore({});
    store.dispatch(actions.login({ username: 'test', password: 'test' }))
      .then(() => {
        const expectedActions = [
          { type: actions.AUTH },
          { type: actions.AUTH_SUCCESS, token: 'test' }
        ];
        expect(store.getActions()).to.equal(expectedActions);
      });
  });

  it('creates AUTH_FAILURE with invalid login()', () => {
    nock(baseURL)
      .post('/sessions/create')
      .reply(401, {
        message: 'Invalid username or password'
      });

    const store = mockStore({});
    store.dispatch(actions.login({ username: 'test', password: 'test' }))
      .then(() => {
        const expectedActions = [
          { type: actions.AUTH },
          { type: actions.AUTH_FAILURE, error: 'Invalid username or password' }
        ];
        expect(store.getActions()).to.equal(expectedActions);
      });
  });

  it('creates AUTH_RESET with logout()', () => {
    const store = mockStore({});
    const expectedActions = [{
      type: actions.AUTH_RESET
    }];

    store.dispatch(actions.logout());
    expect(store.getActions()).to.deep.equal(expectedActions);
  });
});

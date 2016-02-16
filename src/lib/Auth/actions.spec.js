import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as actions from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {
  it('creates AUTH_SUCCESS with valid login()', (done) => {
    const expectedActions = [
      { type: actions.AUTH },
      (action) => {
        if (!action.type === actions.AUTH_SUCCESS || !action.token) {
          throw new Error(action.error || 'Unexpected action type or token not available');
        }
      }
    ];
    const store = mockStore({}, expectedActions, done);
    store.dispatch(actions.login({username: 'gonto', password: 'gonto'}));
  });

  it('creates AUTH_FAILURE with invalid login()', (done) => {
    const expectedActions = [
      { type: actions.AUTH },
      (action) => {
        if (!action.type === actions.AUTH_FAILURE || !action.error) {
          throw new Error('Unexpected authentication');
        }
      }
    ];
    const store = mockStore({}, expectedActions, done);
    store.dispatch(actions.login({username: 'test', password: 'test'}));
  });

  it('creates AUTH_RESET with logout()', () => {
    expect(actions.logout()).toEqual({ type: actions.AUTH_RESET });
  });
});

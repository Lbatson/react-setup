import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';
import * as actions from '../../../src/lib/Notification/actions';

const mockStore = configureMockStore();

describe('notification actions', () => {
  it('creates NOTIFY_GENERAL with notify()', () => {
    const store = mockStore({});
    const expectedActions = [{
      type: actions.NOTIFY_GENERAL,
      message: 'test',
      isError: true
    }];

    store.dispatch(actions.notify('test', true));
    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('creates NOTIFY_RESET with reset()', () => {
    const store = mockStore({});
    const expectedActions = [{
      type: actions.NOTIFY_RESET
    }];

    store.dispatch(actions.reset());
    expect(store.getActions()).to.deep.equal(expectedActions);
  });
});

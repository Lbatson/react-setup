import { expect } from 'chai';
import * as actions from '../../../src/lib/Notification/actions';
import reducer from '../../../src/lib/Notification/reducer';
import { initialState } from '../../../src/lib/Notification/reducer';

describe('notification reducer', () => {
  it('should return initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialState());
  });

  it('should return reset state', () => {
    expect(
      reducer({}, { type: actions.NOTIFY_RESET })
    ).to.deep.equal(initialState());
  });

  it('should return loading state', () => {
    expect(
      reducer({}, {
        type: actions.NOTIFY_GENERAL,
        message: 'test',
        isError: true
      })
    ).to.deep.equal({
      autoHideDuration: 2000,
      isError: true,
      message: 'test',
      open: true
    });
  });
});

import expect from 'expect';
import * as actions from './actions';
import reducer from './reducer';
import { initialState } from './reducer';

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should return reset state', () => {
    expect(
      reducer({}, {
        type: actions.AUTH_RESET
      })
    ).toEqual(initialState);
  });

  it('should return loading state', () => {
    expect(
      reducer({}, { type: actions.AUTH })
    ).toEqual({
      loading: true,
      error: false
    });
  });

  it('should return success state', () => {
    expect(
      reducer({}, {
        type: actions.AUTH_SUCCESS,
        token: 'test'
      })
    ).toEqual({
      loading: false,
      token: 'test'
    });
  });

  it('should return error state', () => {
    expect(
      reducer({}, {
        type: actions.AUTH_FAILURE,
        error: 'test'
      })
    ).toEqual({
      loading: false,
      error: 'test'
    });
  });
});

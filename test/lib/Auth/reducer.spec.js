import { expect } from 'chai';
import * as actions from '../../../src/lib/Auth/actions';
import reducer from '../../../src/lib/Auth/reducer';
import { initialState } from '../../../src/lib/Auth/reducer';

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialState());
  });

  it('should return reset state', () => {
    expect(
      reducer({}, { type: actions.AUTH_RESET })
    ).to.deep.equal(initialState());
  });

  it('should return loading state', () => {
    expect(
      reducer({}, { type: actions.AUTH })
    ).to.deep.equal({
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
    ).to.deep.equal({
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
    ).to.deep.equal({
      loading: false,
      error: 'test'
    });
  });
});

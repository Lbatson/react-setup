import { NOTIFY_GENERAL, NOTIFY_RESET } from './actions';

// define initial state of all possible properties
export const initialState = () => ({
  isError: false,
  message: '',
  open: false
});

export default function reducer(state = initialState(), action) {
  // modify state based on action types
  switch (action.type) {
    case NOTIFY_GENERAL:
      return { ...state, open: true, message: action.message, isError: action.isError, autoHideDuration: 2000 };
    case NOTIFY_RESET:
      return initialState();
    default:
      return state;
  }
}

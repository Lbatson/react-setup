// action types
export const NOTIFY_GENERAL = 'NOTIFY_GENERAL';
export const NOTIFY_RESET = 'NOTIFY_RESET';

// action creators
export function notify(message, isError) {
  return {
    type: NOTIFY_GENERAL,
    message,
    isError
  };
}

export function reset() {
  return {
    type: NOTIFY_RESET
  };
}

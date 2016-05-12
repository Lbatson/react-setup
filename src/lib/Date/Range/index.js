import moment from 'moment';
import DateFormat from '../Format';

// Range
export const DEFAULT = 150;

// Ranges
const start = moment().startOf('day').subtract(DEFAULT, 'years');
const end = moment().startOf('day').add(DEFAULT, 'years');

// Validators
const isValid = date =>
  moment(date, DateFormat.STANDARD_DATE).isSameOrAfter(start, 'day') &&
  moment(date, DateFormat.STANDARD_DATE).isSameOrBefore(end, 'day');

const isValidDOB = date =>
  moment(date, DateFormat.STANDARD_DATE).isSameOrAfter(start, 'day') &&
  moment(date, DateFormat.STANDARD_DATE).isSameOrBefore(moment(), 'day');

export { start };
export { end };
export { isValid };
export { isValidDOB };

export default {
  DEFAULT,
  isValid,
  isValidDOB,
  start,
  end
};

import moment from 'moment';

// Formats
export const STANDARD_DATE = 'MM/DD/YYYY';
export const STANDARD_DATETIME = 'MM/DD/YYYY hh:mm a';

// Validators
const isValidDate = date => (/^\d{2}\/\d{2}\/\d{4}$/g).test(date);
const isValidDateTime = date => (/^([0]\d|[1][0-2])\/([0-2]\d|[3][0-1])\/([2][01]|[1][6-9])\d{2}(\s([0]\d|[1][0-2])(\:[0-5]\d){1,2})*\s*([aApP][mM]{0,2})?$/g).test(date);

// Formatters
const getDate = (date, fromFormat) => {
  let newDate = date;
  if (fromFormat) {
    newDate = moment(date, fromFormat);
  }
  if (!moment.isMoment(newDate) && !moment.isDate(newDate)) {
    throw new Error('requires a valid date or moment or a string and a valid moment date format');
  }
  return newDate;
};

/**
 * Given a date and format, return a standard date format
 * @param date
 * @param fromFormat
 */
const standardDate = (date, fromFormat) => moment(getDate(date, fromFormat)).format(STANDARD_DATE);

/**
 * Given a UTC datetime and format, return a local time display
 * @param date
 */
const standardDateTime = (date, fromFormat) => moment(moment.utc(getDate(date, fromFormat)).toDate()).format(STANDARD_DATETIME);

/**
 * Given a due date, return a string the represents how that date/time relates to the current time
 * i.e. Today, Yesterday, Tomorrow, or the standard date format
 */
const dueDateString = dueDate => {
  if (!dueDate) {
    return;
  }
  const due = moment(dueDate);
  if (!due.isValid()) {
    return;
  }
  if (due.isSame(moment(), 'day')) {
    return 'Today';
  }
  const yesterday = moment().subtract(1, 'days');
  if (due.isSame(yesterday, 'day')) {
    return 'Yesterday';
  }
  const tomorrow = moment().add(1, 'days');
  if (due.isSame(tomorrow, 'day')) {
    return 'Tomorrow';
  }
  return standardDate(dueDate);
};

export { standardDate };
export { isValidDate };
export { standardDateTime };
export { isValidDateTime };
export { dueDateString };

export default {
  STANDARD_DATE,
  STANDARD_DATETIME,
  standardDate,
  standardDateTime,
  isValidDate,
  isValidDateTime,
  dueDateString
};

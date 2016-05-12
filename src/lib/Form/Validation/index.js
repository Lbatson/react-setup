import DateFormat from '../../Date/Format';
import DateRange from '../../Date/Range';

export const isDate = (date, isDOB) => {
  if (DateFormat.isValidDate(date)) {
    return isDOB ? DateRange.isValidDOB(date) : DateRange.isValid(date);
  }
  return false;
};

export const isEmail = val => (/.+@.+\..+/i).test(val) && val.length < 254;

export const isZipCode = val => (/\b\d{5}\b/g).test(val);

export const requiredErrors = (required = [], values) => {
  const errors = {};

  required.forEach(i => {
    if (!values[i] && !errors[i]) {
      errors[i] = 'Required';
    }
  });

  return errors;
};

export { isDate };
export { isEmail };
export { isZipCode };
export { requiredErrors };

export default {
  isDate,
  isEmail,
  isZipCode,
  requiredErrors
};

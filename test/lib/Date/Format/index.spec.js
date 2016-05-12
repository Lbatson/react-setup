import { expect } from 'chai';
import moment from 'moment';
import Format from '../../../../src/lib/Date/Format';

describe('Date.Format', () => {
  it('should specify STANDARD_DATE format', () => {
    expect(Format.STANDARD_DATE).to.equal('MM/DD/YYYY');
  });

  it('should return date in standard format', () => {
    const date = moment().format(Format.STANDARD_DATE);
    const formatted = Format.standardDate(moment(), Format.STANDARD_DATE);
    expect(formatted).to.equal(date);
  });

  it('should create valid date with standard format', () => {
    const date = Format.standardDate(moment(), Format.STANDARD_DATE);
    const isValidDate = Format.isValidDate(date);
    expect(isValidDate).to.be.true;
  });

  it('should not be valid with incorrect standard format', () => {
    const isValidDate = Format.isValidDate(moment());
    expect(isValidDate).to.be.false;
  });

  it('should specify STANDARD_DATETIME formats', () => {
    expect(Format.STANDARD_DATETIME).to.equal('MM/DD/YYYY hh:mm a');
  });

  it('should return date in standard datetime format from date with offset', () => {
    const date = moment.utc('2016-01-01T00:00:00.000+0600');
    const formatted = Format.standardDateTime(date);
    // standardDateTime uses the local tz, so we have to know what that is to know what the expected value should be
    // note: only doing this for 2 offsets, right now
    const offset = moment().utcOffset();
    if (offset === 0) {
      expect(formatted).to.equal('12/31/2015 06:00 pm');
    }
    if (offset === -360) {
      expect(formatted).to.equal('12/31/2015 12:00 pm');
    }
  });

  it('should return date in standard datetime format from utc date', () => {
    const date = moment.utc('2016-01-01T00:00:00.000Z');
    const formatted = Format.standardDateTime(date);
    // standardDateTime uses the local tz, so we have to know what that is to know what the expected value should be
    // note: only doing this for 2 offsets, right now
    const offset = moment().utcOffset();
    if (offset === 0) {
      expect(formatted).to.equal('01/01/2016 12:00 am');
    }
    if (offset === -360) {
      expect(formatted).to.equal('12/31/2015 06:00 pm');
    }
  });

  it('should create valid datetime with standard datetime format', () => {
    const date = Format.standardDateTime(moment(), Format.STANDARD_DATETIME);
    const isValidDateTime = Format.isValidDateTime(date);
    expect(isValidDateTime).to.be.true;
  });

  it('should not be valid with incorrect standard datetime format', () => {
    const isValidDateTime = Format.isValidDateTime(moment());
    expect(isValidDateTime).to.be.false;
  });
});

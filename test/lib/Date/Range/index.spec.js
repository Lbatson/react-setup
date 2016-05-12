import { expect } from 'chai';
import moment from 'moment';
import Range from '../../../../src/lib/Date/Range';

describe('Date.Range', () => {
  it('should specify default range', () => {
    expect(Range.DEFAULT).to.equal(150);
  });

  it('should have start date of 150 years before today', () => {
    const date = moment().subtract(Range.DEFAULT, 'years');
    const isSame = moment(date).isSame(Range.start, 'day');
    expect(isSame).to.be.true;
  });

  it('should have end date of 150 years after today', () => {
    const date = moment().add(Range.DEFAULT, 'years');
    const isSame = moment(date).isSame(Range.end, 'day');
    expect(isSame).to.be.true;
  });

  it('should be valid range for current day', () => {
    expect(Range.isValid(moment())).to.be.true;
  });

  it('should be invalid when before range', () => {
    const date = moment().startOf('day').subtract(Range.DEFAULT, 'years').subtract(1, 'minute');
    expect(Range.isValid(date)).to.be.false;
  });

  it('should be invalid when after range', () => {
    const date = moment().startOf('day').add(Range.DEFAULT, 'years').add(1, 'day');
    expect(Range.isValid(date)).to.be.false;
  });

  it('should be valid DOB on or before current day', () => {
    const date = moment().startOf('day');
    expect(Range.isValidDOB(date)).to.be.true;
  });

  it('should be invalid DOB after current day', () => {
    const date = moment().startOf('day').add(1, 'day');
    expect(Range.isValidDOB(date)).to.be.false;
  });
});

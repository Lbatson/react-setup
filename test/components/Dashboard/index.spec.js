import '../../helper';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Dashboard } from '../../../src/components/Dashboard';

const context = {
  router: {}
};

describe('<Dashboard/>', () => {
  it('shallow renders root component', () => {
    const wrapper = shallow(<Dashboard/>, { context });
    expect(wrapper.hasClass('dashboard')).to.be.true;
  });
});

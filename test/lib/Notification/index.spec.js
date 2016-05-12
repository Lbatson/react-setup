import '../../helper';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Notification from '../../../src/lib/Notification';

const props = {
  message: 'test'
};

describe('<Notification/>', () => {
  it('shallow renders root component', () => {
    const wrapper = shallow(<Notification {...props}/>);
    expect(wrapper.find(Notification)).to.exist;
  });
});

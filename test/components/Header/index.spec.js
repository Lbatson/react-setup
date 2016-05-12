import '../../helper';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Header from '../../../src/components/Header';
import testMountWrapper from '../../testMountWrapper';

const props = {
  authenticated: true,
  params: {
    id: null
  },
  routes: [
    {
      name: 'Dashboard',
      path: '/'
    }
  ],
  location: '/'
};

describe('<Header/>', () => {
  it('does not render when unauthenticated', () => {
    const newProps = { ...props, authenticated: false };
    const wrapper = shallow(<Header {...newProps}/>);
    expect(wrapper.find(Header)).to.exist;
  });

  it('renders with Dashboard breadcrumb when authenticated on / route', () => {
    const wrapper = testMountWrapper(<Header {...props}/>);
    expect(wrapper.find('.breadcrumbs').children()).to.have.length(1);
  });
});

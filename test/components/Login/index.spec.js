import '../../helper';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Snackbar } from 'material-ui/Snackbar';
import { Login } from '../../../src/components/Login';
import testMountWrapper from '../../testMountWrapper';

const context = {
  router: {}
};

const props = {
  dispatch: () => null
};

describe('<Login/>', () => {
  it('shallow renders root component', () => {
    const wrapper = shallow(<Login {...props}/>, { context });
    expect(wrapper.find(Login)).to.exist;
  });

  it('calls componentWillMount', () => {
    Login.prototype.componentWillMount = sinon.spy();
    testMountWrapper(<Login {...props}/>, context);
    expect(Login.prototype.componentWillMount.calledOnce).to.be.true;
  });

  it.skip('renders Form', () => {
    const wrapper = testMountWrapper(<Login {...props}/>, context);
    expect(wrapper.find('.login')).to.exist;
    expect(wrapper.find('[name="username"]')).to.exist;
    expect(wrapper.find('[name="password"]')).to.exist;
    expect(wrapper.find('[type="submit"]')).to.exist;
    expect(wrapper.find(Snackbar)).to.exist;
  });

  it.skip('fires onSubmit to dispatch login', () => {
    props.dispatch = sinon.spy();
    const wrapper = testMountWrapper(<Login {...props}/>, context);
    const instance = wrapper.instance();
    sinon.spy(instance, 'onSubmit');
    wrapper.find('button').simulate('click');
    expect(instance.onSubmit.calledOnce);
    expect(props.dispatch.calledOnce);
  });
});

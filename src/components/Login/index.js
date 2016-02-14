import React from 'react';
import { connect } from 'react-redux';
import AutoForm from 'react-auto-form';
import { Input, Button, Snackbar } from 'react-toolbox';
import { login, reset } from '../../lib/auth';

const handleRedirect = function (props) {
  if (props.token) {
    const { location } = this.props;
    const path = (location.state) ? (location.state.nextPathname || '/') : '/';
    this.context.router.replace(path);
  }
};

class Login extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  state = {
    snackbar: false
  };

  componentWillMount () {
    handleRedirect.call(this, this.props)
  }

  componentWillReceiveProps (nextProps) {
    handleRedirect.call(this, nextProps);
    if (!nextProps.token) {
      this.setState({ snackbar: !!nextProps.error });
    }
  };

  onSnackbarTimeout () {
    this.setState({ snackbar: false });
    this.props.dispatch(reset());
  }

  onSubmit = (e, values) => {
    e.preventDefault();
    this.props.dispatch(login(values));
  };

  render() {
    // conditional element to render
    const test = this.state.snackbar ? <div>Test</div> : null;

    return (
      <div>
        {test}
        <AutoForm className='login' onSubmit={this.onSubmit}>
          <Input name='username' type='text' label='Email'/>
          <Input name='password' type='text' label='Password'/>
          <Button type='submit' label='Submit' raised primary/>
        </AutoForm>
        <Snackbar
          active={this.state.snackbar}
          label='Error'
          onTimeout={this.onSnackbarTimeout.bind(this)}
          timeout={2000}
          type='cancel'/>
      </div>
    );
  }
}

export default connect(state => state.auth)(Login);

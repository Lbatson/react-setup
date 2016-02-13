import React from 'react';
import { connect } from 'react-redux';
import AutoForm from 'react-auto-form';
import { Input, Button, Snackbar } from 'react-toolbox';
import { login, reset } from '../../lib/auth';

class Login extends React.Component {
  state = {
    snackbar: false
  };

  componentWillReceiveProps (nextProps) {
    this.setState({ snackbar: !!nextProps.error });
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
          <Input name='email' type='text' label='Email'/>
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

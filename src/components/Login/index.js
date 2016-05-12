import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AutoForm from 'react-auto-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { notify } from '../../lib/Notification/actions';
import { login } from '../../lib/Auth/actions';

const handleRedirect = function(props) {
  if (props.token) {
    const { location } = this.props;
    const path = location.state ? location.state.nextPathname || '/' : '/';
    this.context.router.replace(path);
  }
};

export class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    handleRedirect.call(this, this.props);
  }

  componentWillReceiveProps(nextProps) {
    handleRedirect.call(this, nextProps);
    if (nextProps.error) {
      this.props.dispatch(notify(nextProps.error, true));
    }
  }

  handleSubmit = (e, values) => {
    e.preventDefault();
    this.props.dispatch(login(values));
  };

  render() {
    return (
      <AutoForm className='login' onSubmit={this.handleSubmit}>
        <TextField
          hintText='Email'
          name='username'
          type='text'
        /><br/>
        <TextField
          hintText='Password'
          name='password'
          type='password'
        /><br/><br/>
        <RaisedButton
          secondary
          label='Submit'
          type='submit'
        />
      </AutoForm>
    );
  }
}

export default connect(state => state.auth)(Login);

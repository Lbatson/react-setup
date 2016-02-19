import React from 'react';
import { connect } from 'react-redux';
import AutoForm from 'react-auto-form';
import { TextField, RaisedButton, Snackbar }  from 'material-ui/lib';
import { login, reset } from '../../lib/Auth/actions';

const handleRedirect = function(props) {
  if (props.token) {
    const { location } = this.props;
    const path = location.state ? location.state.nextPathname || '/' : '/';
    this.context.router.replace(path);
  }
};

class Login extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 2000,
      message: 'Error',
      open: false
    };
  }

  componentWillMount() {
    handleRedirect.call(this, this.props);
  }

  componentWillReceiveProps(nextProps) {
    handleRedirect.call(this, nextProps);
    if (nextProps.error) {
      this.setState({
        message: nextProps.error,
        open: !!nextProps.error
      });
    }
  }

  onRequestClose = () => {
    this.setState({ open: false });
    this.props.dispatch(reset());
  };

  onSubmit = (e, values) => {
    e.preventDefault();
    this.props.dispatch(login(values));
  };

  render() {
    // conditional element to render
    const test = this.props.error ? <div>Test</div> : null;

    return (
      <div>
        {test}
        <AutoForm className='login' onSubmit={this.onSubmit}>
          <TextField type='text' name='username' hintText='Email'/><br/>
          <TextField type='password' name='password' hintText='Password'/><br/><br/>
          <RaisedButton type='submit' label='Submit' secondary={true}/>
          <Snackbar
            open={this.state.open}
            message={this.state.message}
            autoHideDuration={this.state.autoHideDuration}
            onRequestClose={this.onRequestClose}
          />
        </AutoForm>
      </div>
    );
  }
}

export default connect(state => state.auth)(Login);

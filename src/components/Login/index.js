import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Auth0Lock from 'auth0-lock';
import RaisedButton from 'material-ui/RaisedButton';
import { notify } from '../../lib/Notification/actions';
import { success, failure } from '../../lib/Auth/actions';

const auth0ClientId = process.env.AUTH0_CLIENT_ID;
const auth0Domain = process.env.AUTH0_DOMAIN;

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

  componentDidMount() {
    this.lock = new Auth0Lock(auth0ClientId, auth0Domain);
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

  handleSignIn = () => {
    this.lock.show((err, profile, token) => {
      if (err) {
        this.props.dispatch(failure(err));
      } else {
        this.props.dispatch(success({ profile, token }));
      }
    });
  };

  render() {
    return (
      <div className="row center-xs">
        <div className="col-xs-12 col-sm-6">
          <h1>Welcome to Digicreds</h1>
          <RaisedButton
            primary
            label='Sign in'
            onTouchTap={this.handleSignIn}
          />
        </div>
      </div>
    );
  }
}

export default connect(state => state.auth)(Login);

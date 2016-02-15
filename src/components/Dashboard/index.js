import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../lib/auth';
import { RaisedButton }  from 'material-ui/lib';

class Dashboard extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  onClick = () => {
    this.props.dispatch(logout());
    this.context.router.replace('/login');
  };

  render() {
    return(
      <div>
        <h1>Hello World</h1>
        <RaisedButton label='Logout' onClick={this.onClick}/>
      </div>
    );
  }
}

export default connect(state => state.auth)(Dashboard);

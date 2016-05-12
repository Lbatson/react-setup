import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../lib/Auth/actions';
import { Card, CardHeader, CardText }  from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

export class Dashboard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  handleClick = () => {
    this.props.dispatch(logout());
    this.context.router.replace('/login');
  };

  render() {
    return (
      <div className="dashboard">
        <Card className="card">
          <CardHeader subtitle="World" title="Hello"/>
          <CardText>
            <RaisedButton label="Logout" onClick={this.handleClick}/>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default connect(state => state.auth)(Dashboard);

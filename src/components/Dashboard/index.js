import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../lib/Auth/actions';
import { Card, CardHeader, CardText, RaisedButton }  from 'material-ui/lib';

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
      <Card className="card">
        <CardHeader title="Hello" subtitle="World"/>
        <CardText>
          <RaisedButton label='Logout' onClick={this.onClick}/>
        </CardText>
      </Card>
    );
  }
}

export default connect(state => state.auth)(Dashboard);

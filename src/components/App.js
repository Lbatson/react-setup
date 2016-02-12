import React from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';

export default class App extends React.Component {
  state = {
    authenticated: !!this.props.token
  };

  render() {
    return (
      <div>
        <Nav {...this.state}/>
        <div className="container" {...this.state}>{this.props.children}</div>
      </div>
    );
  }
}

export default connect(state => state.auth)(App);

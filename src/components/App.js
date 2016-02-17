import React from 'react';
import { connect } from 'react-redux';
import AppBar from './AppBar';

export default class App extends React.Component {
  state = {
    authenticated: !!this.props.token
  };

  render() {
    return (
      <div>
        <AppBar/>
        <div {...this.state} className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(state => state.auth)(App);

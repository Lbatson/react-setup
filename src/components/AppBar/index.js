import React from 'react';
import { IndexLink, Link } from 'react-router';
import { AppBar } from 'material-ui/lib';

export default class extends React.Component {
  render() {
    const links =
      <ul>
        <li><IndexLink to="/" className="logo" activeClassName="active">Dashboard</IndexLink></li>
        <li><Link to="/login" activeClassName="active">Login</Link></li>
      </ul>;

    return (
      <AppBar className="app-bar" iconElementRight={links} />
    );
  }
}

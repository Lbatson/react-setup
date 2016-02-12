import React from 'react';
import { IndexLink, Link } from 'react-router';

export default class extends React.Component {
  render() {
    let publicLinks =
      <li className="nav-link">
        <Link to="/login" activeClassName="active">Login</Link>
      </li>;
    let privateLinks = null;

    return (
      <header className="navigation">
        <div className="navigation-wrapper">
          <nav>
            <ul className="navigation-menu show">
              <li className="nav-link">
                <IndexLink to="/" className="logo" activeClassName="active">Dashboard</IndexLink>
              </li>
              {this.props.authenticated ? privateLinks : publicLinks}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

import React, { PropTypes } from 'react';
import Breadcrumbs from 'react-breadcrumbs';
import AppBar from 'material-ui/AppBar';

export const Header = props => {
  const {
    authenticated,
    params,
    routes
  } = props;

  const header = (
    <div className="header">
      <AppBar/>
      <div className="wrapper">
        <div className="row">
          <div className="col-xs-12">
            <Breadcrumbs
              params={params}
              routes={routes}
              separator=" / "
            />
          </div>
        </div>
      </div>
    </div>
  );

  return authenticated ? header : null;
};

Header.propTypes = {
  authenticated: PropTypes.bool,
  params: PropTypes.object,
  routes: PropTypes.array
};

export default Header;

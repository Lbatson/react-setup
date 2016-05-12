import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './Header';
import Notification from '../lib/Notification';
import * as NotificationActions from '../lib/Notification/actions';

export const App = props => {
  const {
    auth,
    children,
    params,
    notification,
    routes,
    onNotificationReset
  } = props;

  return (
    <div>
      <Header
        authenticated={!!auth.token}
        params={params}
        routes={routes}
      />
      <div className="wrap container-fluid">
        {children}
      </div>
      <Notification
        action="X"
        autoHideDuration={notification.autoHideDuration}
        isError={notification.error}
        message={notification.message}
        open={notification.open}
        onReset={onNotificationReset}
      />
    </div>
  );
};

App.propTypes = {
  auth: PropTypes.object,
  children: PropTypes.any,
  notification: PropTypes.object,
  params: PropTypes.object,
  routes: PropTypes.array,
  onNotificationReset: PropTypes.func
};

const mapStateToProps = state => ({
  auth: state.auth,
  notification: state.notification
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onNotificationReset: NotificationActions.reset
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);

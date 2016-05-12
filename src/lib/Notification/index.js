import React, { Component, PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class Notification extends Component {
  static propTypes = {
    action: PropTypes.string,
    autoHideDuration: PropTypes.number,
    isError: PropTypes.bool,
    message: PropTypes.string,
    open: PropTypes.bool,
    onReset: PropTypes.func
  };

  state = {
    open: false
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.open });
  }

  onClose = () => {
    if (typeof this.props.onReset === 'function') {
      this.props.onReset();
    } else {
      this.setState({ open: false });
    }
  };

  render() {
    const {
      action,
      autoHideDuration,
      message
    } = this.props;

    return (
      <Snackbar
        action={action}
        autoHideDuration={autoHideDuration}
        message={message}
        open={this.state.open}
        onActionTouchTap={this.onClose.bind(this)}
        onRequestClose={this.onClose.bind(this)}
      />
    );
  }
}

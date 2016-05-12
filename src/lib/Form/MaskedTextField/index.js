import React, { Component, PropTypes }  from 'react';
import MaskedInput from 'react-maskedinput';
import TextField from 'material-ui/TextField';

export default class extends Component {
  static propTypes = {
    mask: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    errorText: PropTypes.string,
    floatingLabelText: PropTypes.string,
    hintText: PropTypes.string,
    value: PropTypes.any
  };

  state = {
    value: null
  };

  render() {
    const {
      errorText,
      floatingLabelText,
      hintText,
      mask,
      onChange,
      value,
      ...rest
    } = this.props;

    const handlerChange = e => {
      this.setState({ value: e.target.value });
    };

    return (
      <TextField
        errorText={errorText}
        floatingLabelText={floatingLabelText}
        hintText={hintText}
        {...rest}
      >
        <MaskedInput
          mask={mask}
          placeholder=" "
          value={this.state.value || value}
          onChange={e => onChange(handlerChange(e))}
        />
      </TextField>
    );
  }
}

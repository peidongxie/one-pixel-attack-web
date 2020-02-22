import React from 'react';
import {InputNumber, Switch} from 'antd';
import './index.css';

class SwitchWithInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: props.value === -1,
      input: props.value < 0 ? 0 : props.value,
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeSwitch = this.onChangeSwitch.bind(this);
  }

  onChangeInput(value) {
    if (typeof value === 'number') {
      value = parseInt(value);
      if (value >= 0) {
        this.setState({
          input: value,
        });
      }
      this.props.onChange(value);
    }
  }

  onChangeSwitch(checked) {
    this.setState({
      switch: checked,
    });
    this.props.onChange(checked ? -1 : this.state.input);
  }

  render() {
    return (
      <span className={'switch-with-input'}>
        <InputNumber disabled={this.state.switch} min={0} onChange={this.onChangeInput} value={this.state.input}/>
        <Switch checkedChildren={'默认值'}
                defaultChecked={this.props.value === -1}
                onChange={this.onChangeSwitch}
                unCheckedChildren={'自定义'}/>
      </span>
    )
  }
}

export default SwitchWithInput;

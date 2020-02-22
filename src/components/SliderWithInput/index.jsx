import React from 'react';
import {InputNumber, Slider} from 'antd';
import './index.css';

class SliderWithInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    if (typeof value === 'number') {
      value = parseInt(value);
      if (value <= this.props.max && value >= this.props.min) {
        this.props.onChange(value);
      }
    }
  }

  render() {
    return (
      <span className={'slider-with-input'}>
        <InputNumber max={this.props.max} min={this.props.min} onChange={this.onChange} value={this.props.value}/>
        <Slider max={this.props.max} min={this.props.min} onChange={this.onChange} value={this.props.value}/>
      </span>
    )
  }
}

export default SliderWithInput;
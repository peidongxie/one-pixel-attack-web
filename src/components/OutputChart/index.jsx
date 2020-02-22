import React from 'react';
import {Alert, Skeleton} from 'antd';
import {Axis, Chart, Geom, Legend, Tooltip} from 'bizcharts';
import './index.css';

class OutputChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 210,
    };
    this.fillCanvas = this.fillCanvas.bind(this);
  }

  componentDidMount() {
    const fitHeight = () => {
      this.setState({
        height: (document.getElementById('chart').clientWidth - 60) / 2,
      });
    };
    window.onresize = fitHeight;
    fitHeight();
    this.fillCanvas();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.fillCanvas();
  }

  fillCanvas() {
    const result = this.props.result;
    if (!result.success) return;
    const image = new Image();
    image.src = result.image;
    image.onload = () => {
      const sw = result.width;
      const sh = result.height;
      const beforeCanvas = document.getElementById('before');
      const demoCanvas = document.createElement('canvas');
      const afterCanvas = document.getElementById('after');
      const beforeContext = beforeCanvas.getContext('2d');
      const demoContext = demoCanvas.getContext('2d');
      const afterContext = afterCanvas.getContext('2d');
      beforeContext.imageSmoothingEnabled = false;
      beforeContext.drawImage(image, 0, 0, sw, sh, 0, 0, beforeCanvas.width, beforeCanvas.offsetHeight);
      demoContext.drawImage(image, 0, 0);
      const imageData = demoContext.getImageData(0, 0, sw, sh);
      const data = imageData.data;
      for (const {x, y, value} of result.change) {
        const base = (sw * x + y) << 2;
        const [r, g, b] = value;
        data[base] = r;
        data[base + 1] = g;
        data[base + 2] = b;
      }
      demoContext.putImageData(imageData, 0, 0);
      afterContext.imageSmoothingEnabled = false;
      afterContext.drawImage(demoCanvas, 0, 0, sw, sh, 0, 0, afterCanvas.width, afterCanvas.height);
    };
  }

  isRealLabel(array, label) {
    const value = array[label];
    for (const element of array) {
      if (element > value) return false;
    }
    return true;
  };

  render() {
    const result = this.props.result;
    if (!result.success) {
      return (
        <div id={'chart'}>
          <Skeleton/>
        </div>
      );
    }
    const sw = result.width;
    const sh = result.height;
    const times = Math.floor(160 / sw);
    const dw = sw * times;
    const dh = sh * times;
    const label = result.label;
    const before = result.before;
    const after = result.after;
    let message, stress, type;
    if (!this.isRealLabel(before, label)) {
      message = 'Bad Model';
      stress = '但模型未被干扰的预测与标签不相符';
      type = 'info';
    } else if (!this.isRealLabel(after, label)) {
      message = 'Successful Attack';
      stress = '且改变了模型的预测结果';
      type = 'success';
    } else {
      message = 'Failed Attack';
      stress = '但未能干扰模型的预测结果';
      type = 'error';
    }
    const change = result.change;
    const length = change.length;
    const data = [];
    for (let i = 0; i < before.length; i++) {
      data.push({
        name: 'before',
        label: i.toString(),
        percent: before[i] / 10,
      });
    }
    for (let i = 0; i < after.length; i++) {
      data.push({
        name: 'after',
        label: i.toString(),
        percent: after[i] / 10,
      });
    }
    return (
      <div id={'chart'}>
        <div id={'comparison'}>
          <canvas height={dh + 'px'} id={'before'} width={dw + 'px'}/>
          <canvas height={dh + 'px'} id={'after'} width={dw + 'px'}/>
        </div>
        <Alert description={'攻击了' + sw + 'x' + sh + '图像的' + length + '个像素' + stress}
               message={message}
               showIcon={true}
               type={type}
               id={'alert'}
        />
        <Chart data={data} forceFit={true} height={this.state.height}>
          <Axis name={'label'}/>
          <Axis name={'percent'}/>
          <Geom adjust={[{type: 'dodge', marginRatio: 0}]}
                color={'name'}
                position={'label*percent'}
                type={'interval'}/>
          <Legend/>
          <Tooltip/>
        </Chart>
      </div>
    );
  }
}

export default OutputChart;

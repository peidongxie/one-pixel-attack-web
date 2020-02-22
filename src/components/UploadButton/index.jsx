import React from 'react';
import {Button, message, Upload} from 'antd';
import './index.css';

class UploadButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
    this.beforeUpload = this.beforeUpload.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  beforeUpload(file) {
    if (file.size > (1 << 20) * this.props.size) {
      message.error(`文件不得大于${this.props.size}MB`);
      return false;
    }
  }

  onChange(info) {
    switch (info.file.status) {
      case 'done':
        message.success('模型上传成功');
        this.props.onChange(info.file.response.name);
        break;
      case 'error':
        message.error('模型上传失败');
        break;
      case 'removed':
        message.info('模型移除成功');
        this.props.onChange('');
        break;
      default:
        break;
    }
    this.setState({
      fileList: info.fileList.slice(-1),
    });
  }

  render() {
    return (
      <Upload accept={this.props.accept}
              action={this.props.action}
              beforeUpload={this.beforeUpload}
              fileList={this.state.fileList}
              onChange={this.onChange}
              className={'upload-button'}>
        <Button icon={'upload'}>
          {this.props.button}
        </Button>
        <small>
          {this.props.text}
        </small>
      </Upload>
    )
  }
}

export default UploadButton;

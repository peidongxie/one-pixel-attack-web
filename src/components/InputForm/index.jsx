import React from 'react';
import {Button, Form, message, Switch} from 'antd';
import SwitchWithInput from '../SwitchWithInput';
import SliderWithInput from '../SliderWithInput';
import UploadButton from '../UploadButton';
import {attack, base} from '../../utils/request';
import './index.css';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.submit = this.submit.bind(this);
    this.onChange = props.onChange;
    this.getFieldDecorator = props.form.getFieldDecorator;
    this.validateFields = props.form.validateFields;
  }

  submit(e) {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    attack(this.validateFields, this.onChange)
      .catch(() => {
        message.info('服务器罢工啦');
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    return (
      <Form labelCol={{xs: {span: 5, offset: 1}, sm: {span: 4, offset: 2}, md: {span: 3, offset: 3}}}
            wrapperCol={{xs: 17, sm: 16, md: 15}}
            onSubmit={this.submit}
            id={'form'}>
        <Form.Item label={'图像'}>
          {this.getFieldDecorator('image', {initialValue: '', valuePropName: 'value'})(
            <UploadButton accept={'.npy,.png'}
                          action={base + '/file'}
                          button={'上传(.npy/.png)'}
                          size={0.5}
                          text={'默认为CIFAR10随机图'}/>
          )}
        </Form.Item>
        <Form.Item label={'模型'}>
          {this.getFieldDecorator('model', {initialValue: '', valuePropName: 'value'})(
            <UploadButton accept={'.h5'}
                          action={base + '/file'}
                          button={'上传(.h5)'}
                          size={5}
                          text={'默认为CIFAR10-CNN模型'}/>
          )}
        </Form.Item>
        <Form.Item label={'标签'}>
          {this.getFieldDecorator('label', {initialValue: -1, valuePropName: 'value'})(
            <SwitchWithInput/>
          )}
        </Form.Item>
        <Form.Item label={'扰动像素数'}>
          {this.getFieldDecorator('count', {initialValue: 10, valuePropName: 'value'})(
            <SliderWithInput min={0} max={20}/>
          )}
        </Form.Item>
        <Form.Item label={'模型规一化'}>
          {this.getFieldDecorator('normalized', {initialValue: true, valuePropName: 'checked'})(
            <Switch/>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{span: 6, offset: 6}}>
          <Button htmlType={'submit'} type={'danger'} icon={'block'} loading={this.state.loading} className={'submit'}>
            Attack
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({name: 'form'})(InputForm);

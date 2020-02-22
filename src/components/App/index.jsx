import React from 'react';
import {Layout} from 'antd';
import NavigationBar from '../NavigationBar';
import InputForm from '../InputForm';
import OutputChart from '../OutputChart';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {
        image: '',
        width: 0,
        height: 0,
        label: 0,
        before: [],
        change: [],
        after: [],
        success: false,
      },
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(result) {
    this.setState({
      result: result
    });
  }

  render() {
    return (
      <Layout>
        <Layout.Header>
          <NavigationBar/>
        </Layout.Header>
        <Layout.Content>
          <InputForm onChange={this.onChange}/>
          <OutputChart result={this.state.result}/>
        </Layout.Content>
        <Layout.Footer>Copyright © 2020 Peidong Xie</Layout.Footer>
      </Layout>
    );
  }
}

export default App;

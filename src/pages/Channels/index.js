import { getChannels } from 'api/channel';
import React, { Component } from 'react';
import { Form, Select } from 'antd';
const { Option } = Select;

export default class channels extends Component {
  state = {
    channels: [],
  };
  render() {
    return (
      <Select
        style={{ width: 200 }}
        placeholder="请选择文章频道"
        value={this.props.value}
        onChange={this.props.onChange}
      >
        {this.state.channels.map((item) => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    );
  }
  async getChannelList() {
    const res = await getChannels();
    this.setState({
      channels: res.data.channels,
    });
  }
  async componentDidMount() {
    this.getChannelList();
  }
}

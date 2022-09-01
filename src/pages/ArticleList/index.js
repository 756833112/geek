import React, { Component } from 'react';
import {
  Card,
  Breadcrumb,
  Radio,
  Form,
  Button,
  Select,
  DatePicker,
  Table,
  Tag,
  Space,
} from 'antd';
import { Link } from 'react-router-dom';
import { ArticleStatus } from 'api/constants';
import { getChannels } from 'api/channel';
import { getArticles } from 'api/article'
const { Option } = Select;
class ArticleList extends Component {
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';

            if (tag === 'loser') {
              color = 'volcano';
            }

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  state = {
    channels: [],
    articles: {},
  };
  render() {
    return (
      <div>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>文章列表</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          {/* 表单 */}
          <Form initialValues={{ status: -1 }} onFinish={this.onFinish}>
            <Form.Item label="状态" name="status">
              <Radio.Group>
                {ArticleStatus.map((item) => (
                  <Radio key={item.id} value={item.id}>
                    {item.name}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>

            {/* 频道 */}
            <Form.Item label="频道" name="channel_id">
              <Select style={{ width: 200 }} placeholder="请选择文章频道">
                {this.state.channels.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* 日期选择 */}
            <Form.Item label="日期" name="date">
              <DatePicker.RangePicker />
            </Form.Item>

            {/* 按钮 */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                筛选
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* 表单 */}
        <Card title={'根据筛选条件共查询到xxx条结果'}>
          {/* 表格 */}
          <Table columns={this.columns} dataSource={this.data}></Table>
        </Card>
      </div>
    );
  }
  async componentDidMount() {
    this.getChannelList()

    this.getArticleList()
  }

  // 频道数据接口
  async getChannelList(){
    const res = await getChannels()
    this.setState({
      channels: res.data.channels
    })
  }
  //文章数据接口
  async getArticleList(){
    const res = await getArticles()
    this.setState({
      articles: res.data
    })
  }

  onFinish = (values) => {
    console.log(values);
  };
}

export default ArticleList;

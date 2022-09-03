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
  Modal,
} from 'antd';
import { Link } from 'react-router-dom';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { ArticleStatus } from 'api/constants';
import { getArticles } from 'api/article';
import { delArticle } from 'api/article';
import defaultImg from 'assets/defaultImage.png';
import Channels from 'pages/Channels';
class ArticleList extends Component {
  columns = [
    {
      title: '封面',
      dataIndex: '',
      render(data) {
        if (data.cover.type === 0) {
          //无图
          return (
            <img
              src={defaultImg}
              style={{ width: 200, height: 120, objectFit: 'cover' }}
            />
          );
        } else {
          return (
            <img
              src={data.cover.images[0]}
              style={{ width: 200, height: 120, objectFit: 'cover' }}
            />
          );
        }
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(status) {
        const obj = ArticleStatus.find((item) => item.id === status);
        return <Tag color={obj.color}>{obj.name}</Tag>;
      },
    },

    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <Space>
            <Button
              type="primary"
              shape="circle"
              onClick={() => this.handleEdit(data.id)}
              icon={<EditOutlined></EditOutlined>}
            ></Button>
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined></DeleteOutlined>}
              onClick={() => this.handleDelete(data.id)}
            ></Button>
          </Space>
        );
      },
    },
  ];
  //存放文章列表参数
  reqParams = {
    page: 1,
    per_page: 10,
  };

  state = {
    channels: [],
    articles: {},
  };

  render() {
    const { total_count, results, per_page, page } = this.state.articles;
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
              <Channels></Channels>
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

        <Card title={`根据筛选条件共查询到${total_count}条结果`}>
          <Table
            columns={this.columns}
            dataSource={results}
            rowKey="id"
            pagination={{
              position: ['bottomCenter'],
              total: total_count,
              pageSize: per_page,
              current: page,
              onChange: this.onChange,
            }}
          ></Table>
        </Card>
      </div>
    );
  }

  handleEdit = (id) => {
    this.props.history.push(`/home/publish/${id}`)
  };
  onChange = (page, pageSize) => {
    console.log(page, pageSize);
    this.reqParams.page = page;
    this.reqParams.per_page = pageSize;
    this.getArticleList();
  };

  async componentDidMount() {
    this.getArticleList();
  }

  //文章数据接口
  async getArticleList() {
    const res = await getArticles(this.reqParams);
    this.setState({
      articles: res.data,
    });
  }

  onFinish = ({ status, channel_id, date }) => {
    if (status !== -1) {
      this.reqParams.status = status;
    } else {
      delete this.reqParams.status;
    }
    if (channel_id !== undefined) {
      this.reqParams.channel_id = channel_id;
    } else {
      delete this.reqParams.channel_id;
    }
    if (date) {
      this.reqParams.begin_pubdate = date[0].format('YYYY-MM-DD');
      this.reqParams.end_pubdate = date[1].format('YYYY-MM-DD');
    } else {
      delete this.reqParams.begin_pubdate;
      delete this.reqParams.end_pubdate;
    }
    this.reqParams.page = 1;
    this.getArticleList();
    console.log(this.reqParams);
  };

  //删除按钮
  handleDelete = (id) => {
    console.log(id);
    Modal.confirm({
      title: '您确定要删除吗？',
      icon: <ExclamationCircleOutlined></ExclamationCircleOutlined>,
      onOk: async () => {
        //发送请求删除文章
        await delArticle(id);
        this.getArticleList();
      },
    });
  };
}

export default ArticleList;

import React, { Component } from 'react';
import {
  Card,
  Form,
  Breadcrumb,
  Button,
  Input,
  Radio,
  Upload,
  Modal,
  message,
} from 'antd';
import { Link } from 'react-router-dom';
import Channel from 'pages/Channels/index';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './index.module.scss';
import { addArticle, getArticleById, updateArticle } from 'api/article';

class ArticlePublish extends Component {
  state = {
    type: 1,
    fileList: [],
    previewImage: {},
    previewVisible: false,
    id: this.props.match.params.id,
  };
  formRef = React.createRef();
  render() {
    const { previewImage, previewVisible, id } = this.state;
    return (
      <div className={styles.root}>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{id ? '编辑文章' : '发布文章'}</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form
            ref={this.formRef}
            validateTrigger={['onBlur', 'onChange']}
            labelCol={{ span: 4 }}
            size="large"
            onFinish={this.onFinish}
            initialValues={{ content: '', type: 1 }}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: '文章标题不能为空',
                },
              ]}
            >
              <Input
                style={{ width: 400 }}
                placeholder="请输入文章的标题"
              ></Input>
            </Form.Item>
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[{ required: true, message: '必填选项' }]}
            >
              <Channel></Channel>
            </Form.Item>
            <Form.Item label="封面" name="type">
              <Radio.Group onChange={this.changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4 }}>
              {this.state.type !== 0 && (
                <Upload
                  listType="picture-card"
                  fileList={this.state.fileList}
                  action="http://geek.itheima.net/v1_0/upload"
                  name="image"
                  onChange={this.UploadImage}
                  onPreview={this.handlePreview}
                  beforeUpload={this.beforeUpload}
                >
                  {this.state.fileList.length < this.state.type && '上传'}
                </Upload>
              )}
            </Form.Item>

            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '内容不能为空' }]}
            >
              <ReactQuill
                theme="snow"
                placeholder="请输入文章内容"
              ></ReactQuill>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4 }}>
              <Button type="primary" htmlType="submit" size="large">
                发布文章
              </Button>
              <Button size="large" onClick={this.addDraft}>
                存入草稿
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Modal
          visible={previewVisible}
          title="图片预览"
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage}></img>
        </Modal>
      </div>
    );
  }
  async componentDidMount() {
    if (this.state.id) {
      const res = await getArticleById(this.state.id);
      const values = {
        ...res.data,
        type: res.data.cover.type,
      };
      const fileList = res.data.cover.images.map((item) => {
        return {
          url: item,
        };
      });
      this.setState({
        fileList,
        type: res.data.cover.type,
      });
      this.formRef.current.setFieldsValue(values);
    }
  }

  async save(values, draft) {
    const { fileList, type } = this.state;
    if (fileList.length !== type) {
      return message.warn('图片数量不足');
    }
    const images = fileList.map((item) => {
      return item.url || item.response.data.url;
    });
    if(this.state.id){
      await updateArticle(
        {
          ...values,
          cover:{
            type,
            images,
          },
          id: this.state.id,
        },
        draft
      )
      message.success('修改成功')
    }else{
    //使用添加文章接口
    const res = await addArticle(
      {
        ...values,
        cover: {
          type,
          images,
        },
      },
      draft
    );
    message.success('添加文章成功');
    }

    this.props.history.push('/home/list');
    
  }

  onFinish = async (values) => {
    this.save(values, false);
  };
  addDraft = async () => {
    console.log('添加草稿');
    const values = await this.formRef.current.validateFields();
    this.save(values, true);
  };

  changeType = (e) => {
    this.setState({
      type: e.target.value,
      fileList: [],
    });
  };
  UploadImage = ({ fileList }) => {
    this.setState({
      fileList,
    });
  };
  //如果是刚刚上传的图 需要在fileList.response.data.url
  //如果是后台传过来的 就是fie.url
  handlePreview = (file) => {
    console.log('file', file);
    const url = file.url || file.response.data.url;
    this.setState({
      previewVisible: true,
      previewImage: url,
    });
  };
  handleCancel = () => {
    this.setState({
      previewVisible: false,
      previewImage: '',
    });
  };
  //图片上传校验
  beforeUpload = (file) => {
    if (file.size >= 1024 * 2000) {
      message.warn('上传文件不能超过500kb');
      return Upload.LIST_IGNORE;
    }
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      message.warn('只能上传jpg或者png的图片');
      return Upload.LIST_IGNORE;
    }
    return true;
  };
}

export default ArticlePublish;

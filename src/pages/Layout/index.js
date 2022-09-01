import React, { Component } from 'react';
import styles from './index.module.scss';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined,
  DiffOutlined,
  HomeOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, message, Popconfirm } from 'antd';
import {
  BrowserRouter as Routers,
  Route,
  Link,
  Switch,
} from 'react-router-dom/cjs/react-router-dom.min';

import Home from 'pages/Home';
import List from 'pages/ArticleList';
import Publish from 'pages/ArticlePublish';
import { removeToken } from 'utils/storage';
import { getUserprofile } from 'api/user';

const { Header, Content, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

class LayoutComponent extends Component {
  state={
    profile:{},
  }
  render() {
    return (
      <div className={styles.layout}>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div className="user">
              <span>{this.state.profile.name}</span>
              <span>
                <Popconfirm
                  title="您确定要退出系统"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={this.onConfirm}
                >
                  <LogoutOutlined /> 退出
                </Popconfirm>
              </span>
            </div>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[this.props.location.pathname]}
                defaultOpenKeys={['sub1']}
                style={{
                  height: '100%',
                  borderRight: 0,
                }}
              >
                <Menu.Item key="/home" icon={<HomeOutlined />}>
                  <Link to="/home">数据概览</Link>
                </Menu.Item>
                <Menu.Item key="/home/list" icon={<DiffOutlined />}>
                  <Link to="/home/list">内容管理</Link>
                </Menu.Item>
                <Menu.Item key="/home/publish" icon={<EditOutlined />}>
                  <Link to="/home/publish">发布文章</Link>
                </Menu.Item>
              </Menu>
            </Sider>

            <Layout
              style={{
                padding: '24px',
              }}
            >
              <Content className="site-layout-background">
                {/* 配置路由 */}
                <Switch>
                  <Route exact path="/home" component={Home}></Route>
                  <Route path="/home/list" component={List}></Route>
                  <Route path="/home/publish" component={Publish}></Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
  onConfirm = () =>{
    removeToken()

    this.props.history.push('/login')

    message.success('退出成功')
  }
  //钩子函数调接口的用户信息
  async componentDidMount (){
    const res = await getUserprofile()
    console.log(res)
    this.setState({
      profile: res.data
    })
  }
}

export default LayoutComponent;

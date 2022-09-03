import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import {ConfigProvider} from 'antd'
// 国际化
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);

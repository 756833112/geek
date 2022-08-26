import React, { Component } from 'react';
import { Card, Button, Checkbox, Form, Input, message } from 'antd';
import './index.scss';
import Logo from 'assets/logo.png';
class Login extends Component {
  render() {
    return (
      <div className="login">
        <Card className="loginContainer">
          <img src={Logo} />

          {/* from 表单 */}
          <Form
            size="large"
            onFinish={this.onFinish}
            initialValues={{
              mobile: '13911111111',
              code: '246810',
              agree: true,
            }}
          >
            <Form.Item
              name="mobile"
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                {
                  required: true,
                  message: '手机号不能为空',
                  validateTrigger: 'onBlur',
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '手机号格式错误',
                  validateTrigger: 'onBlur',
                },
              ]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>

            <Form.Item
              name="code"
              validateTrigger={['onBlur', 'onChange']}
              rules={[
                {
                  required: true,
                  message: '验证码不能为空',
                  validateTrigger: 'onBlur',
                },
                {
                  pattern: /^\d{6}$/,
                  message: '验证码格式不对',
                  validateTrigger: 'onBlur',
                },
              ]}
            >
              <Input placeholder="请输入验证码" />
            </Form.Item>

            <Form.Item
              valuePropName="checked"
              name="agree"
              rules={[
                {
                  validator(rule, value) {
                    if (value) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(new Error('请阅读并同意条款'));
                    }
                  },
                },
              ]}
            >
              <Checkbox>
                我以阅读并同意<a>[隐私条款]</a>和<a href="#">[用户协议]</a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
  onFinish = (values) => {
    console.log('Success:', values);
  };
}

export default Login;

import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import './login.css';
import { FormComponentProps } from 'antd/lib/form/Form';
import { Link } from 'react-router-dom';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface IProps extends FormComponentProps<any> {

}

class Login extends Component<IProps> {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <div className="login">
                    <text className="title">STM登录</text>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input
                                placeholder="用户名"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                style={{ width: 340, height: 40, opacity: 0.85 }}
                            />
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input.Password
                                placeholder="密码"
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                style={{ width: 340, height: 40, opacity: 0.85 }}
                            />
                        )}
                    </Form.Item>

                    <Form.Item> 
                        <div className='buttonBox'>
                        <Checkbox onChange={this.handleRemember} style={{color: 'white'}}>记住登录信息</Checkbox>
                        <Button type="primary" htmlType="submit" style={{ width: 340, height: 40, fontSize: 20}}>登录</Button>
                        <div className='help'>
                       <Link to="/forget"> <text className='text'><span className='dot'>*</span>忘记密码</text></Link>
                       <Link to="/register"> <text className='text'>注册新用户</text></Link>
                        </div>
                        </div>                                              
                    </Form.Item>
                </div>
            </Form>
        );
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            message.success(`${values['username']}登录成功！`);
          } 
        });
    }

    handleRemember = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    }

}

export default Form.create({ name: 'login' })(Login);
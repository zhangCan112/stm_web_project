import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import css from './login.module.css';
import { FormComponentProps } from 'antd/lib/form/Form';
import { Link } from 'react-router-dom';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { GET, filterSuccessCode } from "../../utils/request";
import URLS from "../../utils/urls";
import { delay } from "../../utils/tools";
import history from '../../history'

interface IProps extends FormComponentProps<any> {

}

class Login extends Component<IProps> {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <div className={css.login}>
                    <p className={css.title}>STM登录</p>
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
                        <div className={css.buttonBox}>
                            <Checkbox onChange={this.handleRemember} style={{ color: 'white' }}>记住登录信息</Checkbox>
                            <Button type="primary" htmlType="submit" style={{ width: 340, height: 40, fontSize: 20 }}>登录</Button>
                            <div className={css.help}>
                                <Link to="/forget"> <p className={css.text}><span className={css.dot}>*</span>忘记密码</p></Link>
                                <Link to="/register"> <p className={css.text}>注册新用户</p></Link>
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
                this.login(values)
            }
        });
    }

    login = async (values: { [key: string]: any }) => {
        let hide = message.loading("登录中...", 0)
        let result = await GET(URLS.LOGIN, values)
            .then(filterSuccessCode)
            .catch((e: Error) => {
                return e
            })
        await delay(1000)
        hide()
        if (result instanceof Error) {
            let err = result as Error
            message.error(err.message)
            return
        }

        message.success("登录成功！即将跳转到主页...", 0.75, ()=>{ history.replace('/') })
    }

    handleRemember = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    }

}

export default Form.create({ name: 'login' })(Login);
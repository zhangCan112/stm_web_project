import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Button, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import styles from './register.module.css';
import { POST, filterSuccessCode } from "../../utils/request";
import URLS from "../../utils/urls";
import { delay } from "../../utils/tools";
import history from '../../history'


const userNameKey = "userName"
const emailKey = "email"
const passwordKey = "password"
const confirmKey = "confirm"

interface Iprops extends FormComponentProps<any> {

}

class RegistrationForm extends Component<Iprops> {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div className={styles.container}>
                <p className={styles.title}>用户注册</p>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="邮箱">
                        {getFieldDecorator(emailKey, {
                            rules: [
                                {
                                    type: 'email',
                                    message: '邮箱格式不正确!',
                                },
                                {
                                    required: true,
                                    message: '请输入您的邮箱!',
                                },
                            ],
                        })(<Input style={{ width: 340, height: 40, opacity: 0.85 }} />)}
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                用户名&nbsp;
                            <Tooltip title="您可以使用自定义的用户名登录">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                    >
                        {getFieldDecorator(userNameKey, {
                            rules: [{ required: true, message: '请输入你的用户名!', whitespace: true }],
                        })(
                            <Input
                                style={{ width: 340, height: 40, opacity: 0.85 }}
                                onFocus={this.handleDefaultUserName}
                            />)}
                    </Form.Item>
                    <Form.Item label="密码" hasFeedback>
                        {getFieldDecorator(passwordKey, {
                            rules: [
                                {
                                    required: true,
                                    message: '请设置密码!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password style={{ width: 340, height: 40, opacity: 0.85 }} />)}
                    </Form.Item>
                    <Form.Item label="确认密码" hasFeedback>
                        {getFieldDecorator(confirmKey, {
                            rules: [
                                {
                                    required: true,
                                    message: '请确认密码!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} style={{ width: 340, height: 40, opacity: 0.85 }} />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" style={{ width: 340, height: 40, opacity: 0.85 }}>
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.postRegisterInfo(values)
            }
        });
    };

    postRegisterInfo = async (values: { [key: string]: any }) => {
        let hide = message.loading("正在提交注册信息...", 0)
        let result = await POST(URLS.USER, values)
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

        message.success("注册成功！即将跳转登录页面...", 2.5, ()=>{ history.replace('/login') })
    }

    handleConfirmBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule: any, value: any, callback: any) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue(passwordKey)) {
            callback('两次密码输入不一致，请检查!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule: any, value: any, callback: any) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields([confirmKey], { force: true });
        }
        callback();
    };

    handleDefaultUserName = (e: React.FocusEvent<HTMLInputElement>) => {

        // 如果用户名中已有值，则不需要生成默认的用户名
        const { value } = e.target;
        if (value && value.length > 0) {
            return
        }
        const { form } = this.props;
        // 如果邮箱一栏信息校验错误，无法生成默认的用户名
        let emailErr = form.getFieldError(emailKey)
        if (emailErr) {
            return
        }

        // 用email的前缀名做用户名
        let email = form.getFieldValue(emailKey)
        form.setFieldsValue({ userName: email.split('@')[0] })
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
export default WrappedRegistrationForm
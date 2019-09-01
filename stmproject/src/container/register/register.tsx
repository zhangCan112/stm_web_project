import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import './register.css';

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
            <div className='container'>
                <p className="title">用户注册</p>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>                    
                    <Form.Item label="邮箱">
                        {getFieldDecorator('email', {
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
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入你的用户名!', whitespace: true }],
                        })(<Input style={{ width: 340, height: 40, opacity: 0.85 }} />)}
                    </Form.Item>
                    <Form.Item label="密码" hasFeedback>
                        {getFieldDecorator('password', {
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
                        {getFieldDecorator('confirm', {
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
            }
        });
    };

    handleConfirmBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule: any, value: any, callback: any) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不一致，请检查!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule: any, value: any, callback: any) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
export default WrappedRegistrationForm
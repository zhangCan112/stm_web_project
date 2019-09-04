import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import styles from './home.module.css';
const { Header, Content, Footer } = Layout;

export default class Home extends Component {
    render() {
        return (
            <Layout>
                <Header className={styles.header} style={{background: "#4A90E2"}}>
                    <div className={styles.logo} />
                    <Menu
                        className={styles.menu}
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{background: "#4A90E2"}}                        
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>Content</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}
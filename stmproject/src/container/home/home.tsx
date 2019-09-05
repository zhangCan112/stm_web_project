import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import styles from './home.module.css';
import { NavLink } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

export default class Home extends Component {
    
    render() {
        return (
            <Layout>
                <Header className={styles.header} style={{background: "#4A90E2"}}>
                    <div className={styles.logo} />
                    <div className={styles.navlinksBox}>
                    <NavLink to="/home" className={styles.navLinkNormal} activeStyle={{opacity:1}}>工作台</NavLink>
                    <NavLink to="/home1" className={styles.navLinkNormal} activeStyle={{opacity:1}}>日报</NavLink>
                    <NavLink to="/home2" className={styles.navLinkNormal} activeStyle={{opacity:1}}>周报</NavLink>
                    <NavLink to="/home3" className={styles.navLinkNormal} activeStyle={{opacity:1}}>回顾</NavLink>
                    </div> 
                    <div>
                        用户设置部分
                    </div>                                       
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
import React, { Component } from 'react';
import { Layout, Icon, Avatar } from 'antd';
import styles from './home.module.css';
import { NavLink } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

export default class Home extends Component {

    render() {
        return (
            <Layout>
                <Header className={styles.header} style={{ background: "#4A90E2" }}>
                    <div className={styles.logo} />
                    <div className={styles.navlinksBox}>
                        <NavLink to="/home" className={styles.navLinkNormal} activeStyle={{ opacity: 1 }}>工作台</NavLink>
                        <NavLink to="/home1" className={styles.navLinkNormal} activeStyle={{ opacity: 1 }}>日报</NavLink>
                        <NavLink to="/home2" className={styles.navLinkNormal} activeStyle={{ opacity: 1 }}>周报</NavLink>
                        <NavLink to="/home3" className={styles.navLinkNormal} activeStyle={{ opacity: 1 }}>回顾</NavLink>
                    </div>
                    <div className={styles.setting}>
                        <Icon type="search" className={styles.settingIcon} />
                        <Icon type="bell" className={styles.settingIcon} />
                        <div className={styles.userInfo}>
                            <Avatar className={styles.avatar} icon="user" size={32} />
                            <span className={styles.userName}>User Name</span>
                        </div>
                    </div>
                </Header>
                <Content style={{ padding: '0 50px', marginTop: 24 }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 530 }}>Content</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2019 风林火山技术部出品</Footer>
            </Layout>
        )
    }
}
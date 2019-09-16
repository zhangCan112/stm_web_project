import React, { Component } from 'react';
import { Layout, Icon, Avatar } from 'antd';
import css from './home.module.css';
import { NavLink } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

export default class Home extends Component {

    render() {
        return (
            <Layout style={{height: '100vh'}}>
                <Header className={css.header} style={{ background: "#4A90E2" }}>
                    <div className={css.logo} />
                    <div className={css.navlinksBox}>
                        <NavLink to="/workbench" className={css.navLinkNormal} activeStyle={{ opacity: 1 }}>工作台</NavLink>
                        <NavLink to="/home1" className={css.navLinkNormal} activeStyle={{ opacity: 1 }}>日报</NavLink>
                        <NavLink to="/home2" className={css.navLinkNormal} activeStyle={{ opacity: 1 }}>周报</NavLink>
                        <NavLink to="/home3" className={css.navLinkNormal} activeStyle={{ opacity: 1 }}>回顾</NavLink>
                    </div>
                    <div className={css.setting}>
                        <Icon type="search" className={css.settingIcon} />
                        <Icon type="bell" className={css.settingIcon} />
                        <div className={css.userInfo}>
                            <Avatar className={css.avatar} icon="user" size={32} />
                            <span className={css.userName}>User Name</span>
                        </div>
                    </div>
                </Header>
                <Content className={css.contentBox}>
                    <div className={css.content}>                        
                        {this.props.children}
                    </div>                    
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2019 风林火山技术部出品</Footer>
            </Layout>
        )
    }
}
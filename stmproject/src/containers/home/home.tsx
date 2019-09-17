import React, { Component } from 'react';
import { Layout, Icon, Avatar, Button } from 'antd';
import css from './home.module.css';
import { NavLink } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

export default class Home extends Component {

    render() {
        return (
            <Layout style={{height: '100vh'}}>
                <Header className={css.header} style={{ background: "#4A90E2" }}>
                    <div className={css.logo} >
                    <img  alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" width="32px" height="32px"/>
                    <span className={css.logoTitle}>管理自己的时间</span>
                    </div>
                    <div className={css.navlinksBox}>
                        <NavLink to="/workbench" className={css.navLinkNormal} activeStyle={{ opacity: 1 }}>工作台</NavLink>
                        <NavLink to="/home1" className={css.navLinkNormal} activeStyle={{ opacity: 1 }}>日报</NavLink>
                        <NavLink to="/home2" className={css.navLinkNormal} activeStyle={{ opacity: 1 }}>周报</NavLink>
                        <NavLink to="/home3" className={css.navLinkNormal} activeStyle={{ opacity: 1 }}>回顾</NavLink>
                    </div>
                    <div className={css.setting}>
                        <Icon type="search" className={css.settingIcon} onClick={()=>{}}/>                      
                        <Icon type="bell" className={css.settingIcon} onClick={()=>{}}/>
                        <Button className={css.userInfo} onClick={()=>{}} ghost>
                            <Avatar className={css.avatar} icon="user" size={32} />
                            <span className={css.userName}>User Name</span>
                        </Button>
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
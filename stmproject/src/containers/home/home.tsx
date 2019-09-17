import React, { Component } from 'react';
import { Layout, Icon, Avatar, Button, Popover, message } from 'antd';
import css from './home.module.css';
import { NavLink } from 'react-router-dom';
import * as RoutePath from '../../utils/routepaths';
import { GET, filterSuccessCode } from "../../utils/request";
import URLS from "../../utils/urls";
import { delay } from "../../utils/tools";
import history from '../../history'
const { Header, Content, Footer } = Layout;


interface IProps {

}

interface IState {
    /**
     * 用户信息点击气泡是否展现
     */
    visible: boolean,
}

export default class Home extends Component<IProps, IState> {

    state = {
        visible: false,
    };

    /**
     *  用户信息点击气泡
     */
    userInfoPopoverContent = (
        <Button
            className={css.userInfoPopoverContent}
            onClick={() => {
                this.userInfoPopoverHide()
                this.logout()
            }}>
            <Icon type="logout" />
            退出登录
        </Button>
    )

    render() {
        return (
            <Layout style={{ height: '100vh' }}>
                <Header className={css.header} style={{ background: "#4A90E2" }}>
                    <div className={css.logo} >
                        <img
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                            width="32px"
                            height="32px" />
                        <span className={css.logoTitle}>管理自己的时间</span>
                    </div>
                    <div className={css.navlinksBox}>
                        <NavLink
                            to={RoutePath.Workbench}
                            className={css.navLinkNormal}
                            activeStyle={{ opacity: 1 }}>
                            工作台
                              </NavLink>
                        <NavLink
                            to="/home1"
                            className={css.navLinkNormal}
                            activeStyle={{ opacity: 1 }}>
                            日报
                            </NavLink>
                        <NavLink
                            to="/home2"
                            className={css.navLinkNormal}
                            activeStyle={{ opacity: 1 }}>
                            周报
                               </NavLink>
                        <NavLink
                            to="/home3"
                            className={css.navLinkNormal}
                            activeStyle={{ opacity: 1 }}>
                            回顾
                            </NavLink>
                    </div>
                    <div className={css.setting}>
                        <Icon type="search" className={css.settingIcon} onClick={() => { }} />
                        <Icon type="bell" className={css.settingIcon} onClick={() => { }} />
                        <Popover
                            placement='bottom'
                            trigger="click"
                            content={this.userInfoPopoverContent}
                            visible={this.state.visible}
                            onVisibleChange={this.handleVisibleChange}
                        >
                            <Button
                                className={css.userInfo}
                                onClick={() => { }}
                                ghost>
                                <Avatar className={css.avatar} icon="user" size={32} />
                                <span className={css.userName}>User Name</span>
                            </Button>
                        </Popover>
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

    userInfoPopoverHide = () => {
        this.setState({
            visible: false,
        });
    }

    handleVisibleChange = (visible: boolean) => {
        this.setState({ visible });
    }

    logout = async () => {
        let hide = message.loading("正在退出登录...", 0)
        let result = await GET(URLS.LOGOUT)
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

        message.success("登出成功！", 0.5, ()=>{ history.replace('/') })
    }

}
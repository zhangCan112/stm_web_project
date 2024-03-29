import React, { Component } from 'react';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { RouteChildrenProps } from 'react-router';
import cookies from "./cookies"
import * as Path from './routepaths'

interface IRouteProps extends RouteComponentProps {
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    render?: ((props: RouteComponentProps<any>) => React.ReactNode);
    children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
    path?: string | string[];
    exact?: boolean;
    sensitive?: boolean;
    strict?: boolean;
}

class Login extends Component<IRouteProps> {
    render() {
        return <CustomRoute {...this.props} mode="login" />
    }
}

class Logout extends Component<IRouteProps> {
    render() {
        return <CustomRoute {...this.props} mode="logout" />
    }
}


interface IProps extends RouteComponentProps, IRouteProps {
    mode?: "login" | "logout" | "none"
}

interface IState {
    isAuthenticated: boolean
}

class CustomRoute extends Component<IProps, IState> {

    timeoutID: NodeJS.Timeout | null = null

    render() {
        let mode = this.props.mode || "none"
        switch (mode) {
            case "login":
                return this.loginMode()
            case "logout":
                return this.logoutMode()
            default:
                return <Route {...this.props} />
        }

    }

    loginMode = () => {
        let isAuthenticated = cookies.isLogin()
        let { component, ...rest } = this.props
        return isAuthenticated
            ?
            (<Route {...this.props} />)
            :
            <Route {...rest}
                render={(props: RouteComponentProps<any>) => {
                    if (this.timeoutID == null) {
                        this.timeoutID = setTimeout(() => {
                            const { history } = this.props;
                            history.replace(Path.Login);
                            this.timeoutID = null
                        }, 500)
                    }
                    return <LoginLoading></LoginLoading>
                }} />
    }

    logoutMode = () => {
        let isAuthenticated = cookies.isLogin()
        let { component, ...rest } = this.props
        return !isAuthenticated
            ?
            (<Route {...this.props}>
                {this.props.children}
            </Route>)
            :
            <Route {...rest}
                render={(props: RouteComponentProps<any>) => {
                    if (this.timeoutID == null) {
                        this.timeoutID = setTimeout(() => {
                            const { history } = this.props;
                            history.replace(Path.Home);
                            this.timeoutID = null
                        }, 500)
                    }
                    return <HomeLoading></HomeLoading>
                }} />
    }

}

// LoginLoading 跳转登录页
class LoginLoading extends Component {
    render() {
        return <p style={{ width: "100%", textAlign: "center", fontSize: "20px", lineHeight: "50px" }}>请登录...</p>
    }
}

// LoginLoading 跳转首页
class HomeLoading extends Component {
    render() {
        return <p style={{ width: "100%", textAlign: "center", fontSize: "20px", lineHeight: "50px" }}>返回首页...</p>
    }
}

export default {
    Custom: withRouter(CustomRoute),
    Login: withRouter(Login),
    Logout: withRouter(Logout),
};
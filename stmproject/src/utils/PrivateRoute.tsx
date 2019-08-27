import React, { Component } from 'react';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';


interface IProps extends RouteComponentProps {
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    path?: string | string[];
}

interface IState {
    isAuthenticated: boolean
}

class PrivateRoute extends Component<IProps, IState> {

    timeoutID: NodeJS.Timeout | null = null

    render() {        
        let isAuthenticated = window.sessionStorage.getItem("isLogin") ? true : false
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
                            history.replace("/login");
                            this.timeoutID = null
                        }, 1000)
                    }
                    return <LoginLoading></LoginLoading>
                }} />
    }
}

// LoginLoading 跳转登录页
class LoginLoading extends Component {
    render() {
        return <p style={{ width: "100%", textAlign: "center", fontSize: "20px", lineHeight: "50px" }}>请登录...</p>
    }
}

export default withRouter(PrivateRoute);
import React, {Component} from 'react';
import {Route, withRouter, RouteComponentProps} from 'react-router-dom';


interface IProps extends RouteComponentProps  {
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;    
    path?: string | string[];
}

interface IState {
    isAuthenticated: boolean
}

class PrivateRoute extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isAuthenticated: window.sessionStorage.getItem("isLogin") ? true: false
        }
    }

    componentWillMount() {
        if(!this.state.isAuthenticated){
            const {history} = this.props;
            setTimeout(() => {
                history.replace("/login");
            }, 1000)
        }
    }

    render() {            
        return  this.state.isAuthenticated ? 
        (<Route {...this.props}/> ) :  <Route {...this.props} component={LoginLoading}/> 
    }
}

// LoginLoading 跳转登录页
class LoginLoading extends Component {
    render() {
        return <p style = {{width: "100%", textAlign: "center", fontSize: "20px", lineHeight: "50px"}}>请登录...</p>
    }
}

export default withRouter(PrivateRoute);
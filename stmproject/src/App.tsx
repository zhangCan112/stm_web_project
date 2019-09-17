import React, { Component } from 'react';
import { createStore } from "redux";
import rootReducer from "./reducers/index";
import { Provider } from 'react-redux';
import './App.css';
import { Router, Switch, Redirect, Route as R } from 'react-router';
import Route from "./utils/route";
import browserHistory from './history'
import * as Path from './utils/routepaths'
import Login from './pages/login/login';
import Forget from './pages/forget/forget';
import Register from './pages/register/register';
import Workbench from './pages/workbench/workbench';
import NotFoundPage from './pages/404/404'

const store = createStore(rootReducer)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Switch>
            <Redirect exact from={Path.Home} to={Path.Workbench} />
            <Route.Login path={Path.Workbench} component={Workbench} />
            <Route.Logout path={Path.Login} component={Login} />
            <Route.Logout path={Path.Forget} component={Forget} />
            <Route.Logout path={Path.Register} component={Register} />
            <R component={NotFoundPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
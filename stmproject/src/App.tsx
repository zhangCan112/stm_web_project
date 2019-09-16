import React, { Component } from 'react';
import { createStore } from "redux";
import rootReducer from "./reducers/index";
import { Provider } from 'react-redux';
import './App.css';
import { Router, Switch, Redirect, Route as R } from 'react-router';
import Route from "./utils/Route";
import browserHistory from './history'

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
            <Redirect exact from='/' to='work' />
            <Route.Login path='/Workbench' component={Workbench} />
            <Route.Logout path='/login' component={Login} />
            <Route.Logout path='/forget' component={Forget} />
            <Route.Logout path='/register' component={Register} />
            <R component={NotFoundPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
import React, { Component } from 'react';
import { createStore } from "redux";
import rootReducer from "./reducer/index";
import { Provider } from 'react-redux';
import './App.css';
import { Router } from 'react-router';
import Route from "./utils/Route";
import browserHistory from './history'

import Login from './container/login/login';
import Forget from './container/forget/forget';
import Register from './container/register/register';
import Home from './container/home/home';
import Work from './container/work/work';

const store = createStore(rootReducer)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Home>
            <Route.Login path='home1' component={Work} />
            <Route.Login path='home2' component={Login} />
            <Route.Login path='home3' component={Login} />
          </Home>
          <Route.Logout path='/login' component={Login} />
          <Route.Logout path='/forget' component={Forget} />
          <Route.Logout path='/register' component={Register} />
        </Router>
      </Provider>
    );
  }
}

export default App;
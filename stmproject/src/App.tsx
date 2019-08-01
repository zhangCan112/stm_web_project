import React, { Component } from 'react';
import { createStore } from "redux";
import rootReducer from "./reducer/index";
import { Provider } from 'react-redux';
import './App.css';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history'

import Login from './container/login/login';
import Forget from './container/forget/forget';
import Register from './container/register/register';

const browserHistory = createBrowserHistory()
const store = createStore(rootReducer)

class App extends Component {
  render() {        
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/login' component={Login} />
          <Route path='/forget' component={Forget} />
          <Route path='/register' component={Register} />
        </Router>
      </Provider>
    );
  }
}

export default App;
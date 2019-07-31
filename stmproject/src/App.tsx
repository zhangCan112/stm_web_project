import React, { Component } from 'react';
import { Button } from 'antd';
import './App.css';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history'
const browserHistory = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router  history={browserHistory}>
          <Route path='/abc' component={Button} />
        </Router>
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

export default App;
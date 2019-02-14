import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Budget from './components/Budget/Budget';
import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/' component={Login} exact />
          <Route path='/my-budget' component={Budget} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;

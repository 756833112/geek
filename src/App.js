import React, { Component } from 'react';
import { Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Layout';
import Login from './pages/Login';
import Error from './pages/Error';
import AuthRoute from 'component/AuthRoute';
import history from 'utils/history';
console.log('history', history);

function App() {
  return (
    <Router history={history.history}>
      {/* 配置路由规则 */}
      <Switch>
        <Redirect exact from="/" to="/home"></Redirect>
        <AuthRoute path="/home" component={Home}></AuthRoute>
        <Route path="/login" render={(props) => <Login {...props} />}></Route>
        <Route component={Error}></Route>
      </Switch>
    </Router>
  );
}

export default App;

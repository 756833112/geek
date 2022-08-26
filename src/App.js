import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Home from './pages/Layout'
import Login from './pages/Login'
import Error from './pages/Error'

function App() {
  return (
    <Router>
      


      {/* 配置路由规则 */}
      <Switch>
        <Route path='/home' component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route component={Error}></Route>
      </Switch>
    </Router>
  );
}

export default App;

import React from 'react';
import { Router, Route } from 'react-router';
import Home from '../routes/Home/index';
import Login from '../routes/Login/index';
import Register from '../routes/Register/index';
import SecurityQuestion from '../routes/Register/SecurityQuestion/index'


const Routes = (props) => (
  <Router {...props}>
    <Route exact path = "/" component = { Home } />
    <Route path = "/login" component = { Login } />
    <Route path =  "/register" component = { Register } />
    <Route path = "/question" component = { SecurityQuestion } />
  </Router>
);

export default Routes;

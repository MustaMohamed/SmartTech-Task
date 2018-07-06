import React from 'react';
import {  Switch, Route } from 'react-router-dom';


import Admin from '../components/pages/Admin';
import Home from "../components/pages/Home";

export default (

  <Switch>
    <Route path={ '/' } exact component={ Home }/>
    <Route path={ '/home' } exact component={ Home }/>
    <Route path={ '/admin' } exact component={ Admin }/>
    { /*<Route path={'/*'} exact component={NotFound} />*/ }
  </Switch>

);
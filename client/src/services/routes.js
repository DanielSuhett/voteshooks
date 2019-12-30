import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Login from '../pages/Signin';
import listPoll from '../pages/PollsList';
import createPoll from '../pages/createPoll';
import configPoll from "../pages/configPoll";
import Singup from '../pages/Singup';

import { isAuth } from './auth';
import NavHeader from '../components/NavHeader';

export const Routes = () => {
  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) => isAuth()
          ? (<Component {...props} /> )
          : (<Redirect to={{ pathname: '/singin', state: { from: props.location } }} />
          )
        }
      />
    )
  }

  return (
    <Switch>
      <PrivateRoute path='/polls' exact component={listPoll} />
      <PrivateRoute path='/create' component={createPoll} />
      <PrivateRoute path='/polls/:id' component={configPoll} />

      <Route path="/singin" component={Login} />
      <Route path="/singup" component={Singup} />

      <Route path="/" exact>
        <Redirect to='/polls' />
      </Route>
      
      <Route>
        <NavHeader />
        <h1>Page not found</h1>
      </Route>
    </Switch>
  )
}
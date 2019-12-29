import React from "react";
import { Switch, Route } from 'react-router-dom'
import App from "../pages/App";
import Result from "../pages/Result";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={App}></Route>
      <Route path="/result" component={Result}></Route>
    </Switch>
  )
}
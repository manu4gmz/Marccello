import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import Orders from "../containers/Orders";
import SingleOrder from "../containers/SingleOrder";

export default ({match})=> {
  return (
    <Fragment>
      <Switch>
        <Route path={match.path + "/orders/:id"} exact component={SingleOrder} />
        <Route path={match.path + "/orders"} exact component={Orders} />
        <Redirect path={ match.path } exact to="/admin/orders" />
      </Switch>
      
    </Fragment>
  );
}

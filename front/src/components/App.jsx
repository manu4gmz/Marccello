import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "../containers/Landing";
import MainNavbar from "../containers/MainNavbar";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductGrid from "./ProductGrid";

export default function() {
  return (
    <Fragment>
      <MainNavbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/productos" component={ProductGrid} />
      </Switch>
      <Footer />
    </Fragment>
  );
}

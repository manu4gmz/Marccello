import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Landing from "../containers/Landing";
import MainNavbar from "../containers/MainNavbar";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductGrid from "../containers/ProductGrid";
import Login from "../containers/Login";
import Register from "../containers/Register";
import SingleProduct from "../containers/SingleProduct";
import Cart from "../containers/Cart";
import Drone from "./Drone";

export default function() {
  return (
    <Fragment>
      <MainNavbar />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/productos/:index" component={ProductGrid} />
        <Redirect path="/productos" exact to="/productos/1" />
        <Route path="/carrito" exact component={Cart} />
        <Route path="/producto/:id" component={SingleProduct} />
        <Route exact path="/" component={Landing} />
      </Switch>
      <Footer />
    </Fragment>
  );
}

import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "../containers/Landing";
import MainNavbar from "../containers/MainNavbar";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductGrid from "../containers/ProductGrid";
import Login from "../containers/Login";
import Register from "../containers/Register";
import SingleProduct from "../containers/SingleProduct";
import Cart from "../containers/Cart";

export default function() {
  return (
    <Fragment>
      <MainNavbar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/productos" component={ProductGrid} />
        <Route path="/carrito" component={Cart} />
        <Route path="/producto" component={SingleProduct} />
        <Route exact path="/" component={Landing} />
      </Switch>
      <Footer />
    </Fragment>
  );
}

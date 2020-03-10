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
import PurchaseView from "../containers/PurchaseView";
import Payment from "../containers/Payment";
import Cart from "../containers/Cart";
import Admin from "./Admin";
import Drone from "./Drone";
import UsersContainer from "../containers/UsersContainer";

export default function() {
  return (
    <Fragment>
      <MainNavbar />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/confirm-purchase" exact component={Payment} />
        <Route path="/purchase/:id" exact component={PurchaseView} />
        <Route path="/productos/:index" component={ProductGrid} />
        <Redirect path="/productos" exact to="/productos/1" />
        <Route path="/carrito" exact component={Cart} />
        <Route path="/admin" component={Admin} />
        <Route path="/producto/:id" component={SingleProduct} />
        <Route path="/users" component={UsersContainer} />
        <Route exact path="/" component={Landing} />
      </Switch>
      <Footer />
    </Fragment>
  );
}

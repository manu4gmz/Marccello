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
import Purchases from "../containers/Purchases";
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
        <Route path="/purchase/:id/status" exact component={PurchaseView} />
        <Route path="/productos/:index" component={ProductGrid} />
        <Redirect path="/productos" exact to="/productos/1" />
        <Route path="/carrito" exact component={Cart} />
        <Route path="/admin" component={Admin} />
        <Route path="/purchases" exact component={Purchases} />
        <Route path="/producto/:id" component={SingleProduct} />
        <Route exact path="/" component={Landing} />
      </Switch>
      <Footer />
    </Fragment>
  );
}

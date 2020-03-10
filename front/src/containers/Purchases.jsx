import React, { Component, Fragment } from "react";
import { Row, Col, Container, Image, Jumbotron } from "react-bootstrap";
import Header from "../components/Header";
import Button1 from "../components/Button";
import ProductModule from "../components/ProductModule";
import {fetchPurchases} from "../store/actions/purchases";
import { connect } from "react-redux";
import Input from "../components/Input";

class Purchases extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPurchases()
  }



  render() {
    const {purchases} = this.props
    return (
    <div>
      {
        purchases.map(purchase => {
          return(
          <div key={purchase.id}>
            {
            purchase.products.map(product =>{
              return(
                <div key={product.id}>
                <p>{product.name} X {product.product_purchase.amount}</p>
                </div>
              )
            })}
            <p> Dirección de envío: {purchase.address} </p>
            <p> $ {purchase.total} </p>
            <p> Fecha: {purchase.createdAt} </p>
            <p> {purchase.status} </p>
            <br/>
            <br/>
          </div>
        )})
      }
    </div>
    )
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    purchases: state.purchases.purchases
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    fetchPurchases: () => dispatch(fetchPurchases()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Purchases);

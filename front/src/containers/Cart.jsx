import React, { Component } from "react";
import CartViewProduct from "../components/CartViewProduct";
import { Container, Row, Col } from "react-bootstrap";
import Button1 from "../components/Button";
import style from "./Cart.css";
import RandomProducts from "../components/RandomProducts";
import Header from "../components/Header";
import Resume from "../components/Resume";
import { connect } from "react-redux";
import {
  fetchCart,
  incrementOrder,
  addToCart,
  fetchFeatured,
  removeFromCart
} from "../store/actions/cart";
import { purchaseCart } from "../store/actions/purchase";
import { goLogin } from "../store/actions/login";

import { Link } from "react-router-dom";
import ProductModule from "../components/ProductModule";
class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart();

    this.props.fetchFeatured();

    this.handleBuy = this.handleBuy.bind(this);
  }

  handleBuy() {
    if (!this.props.user.id)
      this.props.goLogin(this.props.history, () => {
        this.props.history.push("/confirm-purchase");
      });
    else this.props.history.push("/confirm-purchase");
  }

  render() {
    const cart = this.props.cart;
    return (
      <div>
        <Container>
          {cart.length ? (
            <div>
              <Row>
                <Col md="8" style={{ paddingTop: "4%" }}>
                  <div
                    style={{
                      width: "30px",
                      position: "absolute",
                      left: "0px",
                      display: "inline",
                      marginLeft: "0%",
                      marginTop: "-5%"
                    }}
                  >
                      <Link to="/productos/1">
                        <img src="/assets/back.svg" />
                      </Link>
                  </div>
                  {cart.map(product => (
                    <CartViewProduct
                      product={product}
                      changeAmount={this.props.incrementOrder}
                      removeFromCart={this.props.removeFromCart}
                      key={product.id}
                    />
                  ))}
                </Col>
                <Col md="4">
                  <Resume cart={cart} handleBuy={this.handleBuy} />
                </Col>
              </Row>
            </div>
          ) : (
            <div style={{ paddingTop: "10%" }}>
              <Row>
                <Col
                  md="6"
                  style={{ paddingLeft: "30%", paddingBottom: "10%" }}
                >
                  <img src="/assets/sad-08.png" />
                </Col>
                <Col md="6">
                  <h1
                    style={{
                      paddingTop: "25%",
                      color: "#6B4856",
                      fontWeight: "600"
                    }}
                  >
                    Tu carrito <br />
                    está vacío
                  </h1>
                </Col>
              </Row>
            </div>
          )}
          <div style={{ padding: "5% 0 2% 0" }}>
            <Header>También te puede gustar</Header>
          </div>
          <Row>
            {this.props.featured.map((product, i) => (
              <ProductModule
                product={product}
                index={i}
                onClick={() => {
                  this.props.history.push(`/producto/${product.id}`);
                }}
              />
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    cart: state.cart.products,
    user: state.user.user,
    featured: state.cart.featured
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  console.log("OWNPROPS \n\n\n\n", ownProps);

  return {
    fetchCart: () => dispatch(fetchCart()),
    incrementOrder: (productId, num) =>
      dispatch(incrementOrder(productId, num)),
    addToCart: productId => dispatch(addToCart(productId)),
    removeFromCart: productId => dispatch(removeFromCart(productId)),
    purchaseCart: () => dispatch(purchaseCart()),
    goLogin: (history, cb) => dispatch(goLogin(history, cb)),
    fetchFeatured: () => dispatch(fetchFeatured())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

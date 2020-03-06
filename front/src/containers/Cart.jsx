import React, { Component } from "react";
import CartViewProduct from "../components/CartViewProduct";
import { Container, Row, Col } from "react-bootstrap";
import Button1 from "../components/Button";
import style from "./Cart.css";
import RandomProducts from "../components/RandomProducts";
import Header from "../components/Header";
import { connect } from "react-redux";
import {
  fetchCart,
  incrementOrder,
  addToCart,
  removeFromCart
} from "../store/actions/cart";

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart();
  }

  render() {
    const cart = this.props.cart;

    const round = (num) => (Math.floor(num*100))/100;
    
    const totalCount =
      round(
        cart.length
          ? cart.map(p => p.order.amount).reduce((acc, c) => acc + c)
          : 0
      );
    const totalPrice =
      round(
        cart.length
          ? cart.map(p => p.price * p.order.amount).reduce((acc, c) => acc + c)
          : 0
      );
    return (
      <div>
        <Container>
          <Row>
            <Col md="8" style={{ paddingTop: "4%" }}>
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
              <Container className="conta">
                <h4 className="tit">RESUMEN</h4>
                <hr />
                <div className="txt">
                  <p className="txt">
                    {totalCount} producto{totalCount > 1 ? "s" : ""}
                  </p>
                  <hr />
                  <Row>
                    <Col md="7">
                      <p>Total de productos</p>
                    </Col>
                    <Col md="5">
                      <p className="txt2">${round(totalPrice)}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="7">
                      <p>Envío</p>
                    </Col>
                    <Col md="5">
                      <p className="txt2">$200 </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="7">
                      <b>
                        <p>Total</p>
                      </b>
                    </Col>
                    <Col md="5">
                      <b>
                        <p className="txt2">${round(totalPrice + 200)}</p>
                      </b>
                    </Col>
                  </Row>
                </div>
                <div style={{ margin: "3% 30%", padding: "8% 0" }}>
                  <Button1 buttonTxt={"Continuar"} />
                </div>
              </Container>
            </Col>
          </Row>
          <div style={{ padding: "5% 0 2% 0" }}>
            <Header>También te puede gustar</Header>
          </div>
          <RandomProducts />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    cart: state.cart.products
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    fetchCart: products => dispatch(fetchCart(products)),
    incrementOrder: (productId, num) =>
      dispatch(incrementOrder(productId, num)),
    addToCart: productId => dispatch(addToCart(productId)),
    removeFromCart: productId => dispatch(removeFromCart(productId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

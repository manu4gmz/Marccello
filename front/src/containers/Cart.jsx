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
  removeFromCart
} from "../store/actions/cart";
import { purchaseCart } from "../store/actions/purchase";
import { goLogin } from "../store/actions/login";

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart();
  
    this.handleBuy = this.handleBuy.bind(this);
  }

  handleBuy () {
    if (!this.props.user.id) this.props.goLogin(this.props.history, ()=>{
      this.props.history.push("/confirm-purchase")
    })
    else this.props.history.push("/confirm-purchase");
  }

  render() {
    const cart = this.props.cart;
    
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
              <Resume cart={cart} handleBuy={this.handleBuy}/>
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
    cart: state.cart.products,
    user: state.user.user
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  console.log("OWNPROPS \n\n\n\n", ownProps)
  
  return {
    fetchCart: () => dispatch(fetchCart()),
    incrementOrder: (productId, num) =>
      dispatch(incrementOrder(productId, num)),
    addToCart: productId => dispatch(addToCart(productId)),
    removeFromCart: productId => dispatch(removeFromCart(productId)),
    purchaseCart: () => dispatch(purchaseCart()),
    goLogin: (history, cb)=>dispatch(goLogin(history, cb)) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

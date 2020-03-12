import React, { Component } from "react";
import { Row, Col, Container, Image, Jumbotron } from "react-bootstrap";
import { addToCart } from "../store/actions/cart";
import { Link } from "react-router-dom";
import { setAddCart } from "../store/actions/notif";
import { connect } from "react-redux";

const ProductModule = ({ product, onClick, addToCart, cart, setAddCart }) => {
  return (
    <Col md="3" className="px-5">
      <hr />
      <br />
      <Image
        onClick={() => onClick(product.id)}
        className="mb-4"
        fluid="true"
        roundedCircle="true"
        variant="top"
        style={{ marginBottom: "30px" }}
        src={product.imgURL}
        style={{ cursor: "pointer" }}
      />
      <Row>
        <Col md="9">
          <p
            style={{
              fontSize: "18px",
              cursor: "pointer",
              fontWeight: "600",
              lineHeight: "22px"
            }}
            onClick={() => onClick(product.id)}
          >
            {product.name}
          </p>
        </Col>
        <Col md="3">
          <Image
            style={{ width: "20px", display: "inline", cursor: "pointer" }}
            src="../assets/more.svg"
            onClick={() => {
              addToCart(product.id);
              setAddCart(product.name);
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col md="4">
          <Image
            style={{
              width: "15px",
              display: "inline",
              marginRight: "14%",
              marginTop: "-4%"
            }}
            src="../assets/Fstar.svg"
          />
          <p style={{ display: "inline" }}>{product.rating}</p>
        </Col>
        <Col md="8">
          <p style={{ fontWeight: "500" }}>$ {product.price}</p>
        </Col>
      </Row>
    </Col>
  );
};

const mapStateToProps = function(state, ownProps) {
  return {
    cart: state.cart.products
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    addToCart: productId => dispatch(addToCart(productId)),
    setAddCart: prod => dispatch(setAddCart(prod))
  };
};

export default connect(null, mapDispatchToProps)(ProductModule);

import React, { Component } from "react";
import { Row, Col, Container, Image, Jumbotron } from "react-bootstrap";
import { addToCart } from "../store/actions/cart";
import { Link } from "react-router-dom";
import { setAddCart } from "../store/actions/notif";
import { connect } from "react-redux";
import ReactStars from "react-stars";

const ProductModule = ({
  product,
  onClick,
  addToCart,
  cart,
  setAddCart,
  index
}) => {
  return (
    <Col md="3" className="px-5">
      {index >= 4 ? <hr /> : null}
      <br />
      <Image
        onClick={() => onClick(product.id)}
        className="mb-4"
        fluid="true"
        roundedCircle="true"
        variant="top"
        style={{
          marginBottom: "30px",
          width: "13vw",
          maxWidth: "1000000px",
          height: "13vw",
          objectFit: "cover",
          cursor: "pointer"
        }}
        src={product.imgURL}
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
            src="/assets/more.svg"
            onClick={() => {
              addToCart(product.id);
              setAddCart(product.name);
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Image
            style={{
              width: "15px",
              display: "inline",
              marginRight: "3%",
              marginTop: "-4%"
            }}
            src="/assets/Fstar.svg"
          />
          <p style={{ display: "inline-block" }}>{product.rating}</p>
          <p
            style={{
              fontWeight: "500",
              marginLeft: "10%",
              display: "inline-block"
            }}
          >
            ${product.price}
          </p>
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

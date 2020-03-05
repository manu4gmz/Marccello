import React, { Component } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import CartViewProduct from "./CartViewProduct.css";

export default ({ product, changeAmount, removeFromCart }) => {
  return (
    <Container>
      <Row className="mb-4 cont">
        <Col md="2">
          <div className="imag">
            <img style={{ height: "100%" }} src={product.imgURL} />
          </div>
        </Col>
        <Col md="4" style={{ marginLeft: "13px" }}>
          <h4 style={{ marginTop: "19%" }}>{product.name}</h4>
          {/* <a className="dele">
            <i>Eliminar</i>
          </a> */}
        </Col>
        <Col md="5">
          <div style={{ marginTop: "13%" }}>
            <button
              onClick={() => changeAmount(product.id, -1)}
              className={"bot"}
              style={{
                paddingLeft: "11px",
                paddingRight: "11px",
                marginRight: "5px"
              }}
            >
              -
            </button>
            <p style={{ display: "inline", padding: "0 5px" }}>
              {product.order.amount}
            </p>
            <button
              onClick={() => changeAmount(product.id, 1)}
              className={"bot"}
              style={{ marginLeft: "5px" }}
            >
              +
            </button>
            <p className="price">
              ${Math.floor(product.price * product.order.amount * 100) / 100}
            </p>
            <img
              src="assets/close.svg"
              className="cross"
              onClick={() => removeFromCart(product.id)}
            />
          </div>
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

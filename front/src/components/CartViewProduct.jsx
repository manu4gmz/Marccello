import React, { Component } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import CartViewProduct from "./CartViewProduct.css";

export default () => {
  return (
    <Container>
      <Row className="mb-4 cont">
        <Col md="2">
          <div className="imag">
            <img
              style={{ height: "100%" }}
              src="assets/chocolate-ice-cream-popsicle-on-rustic-background.jpg"
            />
          </div>
        </Col>
        <Col md="4" style={{ marginLeft: "13px" }}>
          <h4 style={{ marginTop: "19%" }}>Helado</h4>
          {/* <a className="dele">
            <i>Eliminar</i>
          </a> */}
        </Col>
        <Col md="5">
          <div style={{ marginTop: "13%" }}>
            <button
              className={"bot"}
              style={{
                paddingLeft: "11px",
                paddingRight: "11px",
                marginRight: "5px"
              }}
            >
              -
            </button>
            <p style={{ display: "inline", padding: "0 5px" }}>10</p>
            <button className={"bot"} style={{ marginLeft: "5px" }}>
              +
            </button>
            <p className="price">$100</p>
            <img src="assets/close.svg" className="cross" />
          </div>
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

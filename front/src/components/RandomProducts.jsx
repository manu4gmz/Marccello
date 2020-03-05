import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./RandomProduct.css";

export default () => {
  return (
    <div>
      <Col md="3">
        <div className="crop">
          <img
            style={{ height: "100%" }}
            src="assets/chocolate-ice-cream-popsicle-on-rustic-background.jpg"
          />
        </div>
        <h3>Título</h3>
        <p>3,7</p>
      </Col>
    </div>
  );
};

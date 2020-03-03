import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

export default () => (
  <Container
    fluid
    style={{
      paddingBottom: "30px",
      backgroundColor: "#e2d5da"
    }}
    className="pt-5 mt-3"
  >
    <Container style={{ paddingTop: "15px", color: "#6b4856" }}>
      <Row>
        <Col md="4">
          <img
            src="assets/logo/marccello-logo.svg"
            style={{ width: "100px", marginBottom: "10px" }}
          />
          <p>Probalo y conoccello</p>
          <hr />

          <p>Helados artesanales</p>
        </Col>

        <Col md="4">
          <br />
          Productos
          <br />
          Usuario
          <br />
          Compras realizadas
          <br />
          Nosotros
        </Col>

        <Col md="4">
          <br />
          <b>Contacto:</b>
          <br />
          ig fb
        </Col>
      </Row>
    </Container>
  </Container>
);

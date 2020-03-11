import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

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
        <Col md="6">
          <Link to="/">
            <img
              src="/assets/logo/marccello-logo.svg"
              style={{ width: "120px", marginBottom: "10px" }}
            />
          </Link>
          <p>
            <br />
            Helados artesanales
            <br />
            que te llegan en dron.
          </p>
        </Col>

        {/* <Col md="4">
          <br />
          Productos
          <br />
          Usuario
          <br />
          Compras realizadas
          <br />
          Nosotros
        </Col> */}

        <Col md="6">
          <b>Contacto:</b>
          <br />
          <p>Avenida Siempreviva 742</p>
          <div style={{ marginTop: "1%" }}>
            <img
              src="/assets/instagram.svg"
              href="#"
              style={{ width: "27px", marginRight: "3%" }}
            />
            <img
              src="/assets/facebook.svg"
              href="#"
              style={{ width: "27px" }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  </Container>
);

import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

export default ({ children }) => (
  <Row className="mb-4">
    <Col xs="auto">
      <h4 className="d-inline" style={{ color: "#6b4856", fontWeight: "600" }}>
        {children}
      </h4>
    </Col>
    <Col>
      <hr />
    </Col>
  </Row>
);

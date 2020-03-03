import React from "react";
import { Row, Col, Container, Image, Jumbotron } from "react-bootstrap";

export default props => {
  return (
    <Col md="3" className="px-5">
      <Image
        className="mb-4"
        fluid="true"
        roundedCircle="true"
        variant="top"
        style={{ marginBottom: "30px" }}
        src="http://via.placeholder.com/300"
      />
      <Row>
        <Col md="9">
          <h5>Helado 1</h5>
          <Image
            style={{ width: "15px", display: "inline" }}
            src="../assets/Fstar.svg"
          />
          <p style={{ display: "inline" }}> 3.7</p>
        </Col>
        <Col md="3">
          <Image
            style={{ width: "20px", display: "inline" }}
            src="../assets/more.svg"
          />
        </Col>
      </Row>
    </Col>
  );
};

import React, { Component } from "react";
import { Row, Col, Container, Image, Jumbotron } from "react-bootstrap";

export default ({product, onClick}) => {
  return (
    
    <Col md="3" className="px-5">
    <Image
      onClick = {()=> onClick(product.id)}
      className="mb-4"
      fluid="true"
      roundedCircle="true"
      variant="top"
      style={{ marginBottom: "30px" }}
      src={product.imgURL}
    />
    <Row>
      <Col md="9">
        <h5 onClick = {()=> onClick(product.id)}>{product.name}</h5>
        <Image
          style={{ width: "15px", display: "inline" }}
          src="../assets/Fstar.svg"
        />
        <p style={{ display: "inline" }}>{product.rating}</p>
      </Col>
      <Col md="3">
        <Image
          style={{ width: "20px", display: "inline" }}
          src="../assets/more.svg"
        />
      </Col>
    </Row>
  </Col>
  )      
};


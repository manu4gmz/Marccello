import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./RandomProduct.css";
import ProductModule from "./ProductModule";

export default ({products}) => {
  return (
    <Row>
      {
        products.map((product,i)=>
          <ProductModule product={product} index={i}/>
          )
      }
    </Row>
  );
};

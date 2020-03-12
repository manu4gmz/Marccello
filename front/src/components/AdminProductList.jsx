import React, { Component } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import Styles from "./CartViewProduct.css";
import { Link } from "react-router-dom";

export default ({ product, editProduct, deleteProduct }) => {
  return (
    <Container>
      <Row className="mb-4 cont">
        <Col md="2">
          <div className="imag">
            <img style={{ height: "100%" }} src={product.imgURL} />
          </div>
        </Col>
        <Col md="5" style={{ marginLeft: "13px" }}>
          <h4 style={{ marginTop: "9%" }}>{product.name}</h4>
        </Col>
        <Col md="4">
          <div style={{ marginTop: "13%" }}>
            <p className="price">${product.price}</p>
            <img
              src="/assets/close.svg"
              className="cross"
              onClick={() => deleteProduct(product.id)}
            />
            <Link to={`/admin/edit-product/${product.id}`}>
              <img
                style={{ marginRight: "4%" }}
                src="/assets/edit.svg"
                className="edit"
                onClick={() => editProduct(product.id)}
              />
            </Link>
            <Link
              to={`/admin/add-categories/${product.id}`}
              style={{ color: "#6b4856" }}
            >
              Categorias
            </Link>
          </div>
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

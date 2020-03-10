import React, { Component } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import Styles from "./CartViewProduct.css"

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
                    <h4 style={{ marginTop: "19%" }}>{product.name}</h4>

                </Col>
                <Col md="4">
                    <div style={{ marginTop: "13%" }}>
                        <p className="price">
                            ${product.price}
                        </p>
                        <img
                            src="/assets/close.svg"
                            className="cross"
                            onClick={() => deleteProduct(product.id)}
                        />
                        <img
                            src="/assets/edit.svg"
                            className="edit"
                            onClick={() => editProduct(product.id)}

                        />
                    </div>
                </Col>
            </Row>

            <hr />
        </Container>
    );
};

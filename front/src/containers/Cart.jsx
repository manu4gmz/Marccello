import React, { Component } from "react";
import CartViewProduct from "../components/CartViewProduct";
import { Container, Row, Col } from "react-bootstrap";
import Button1 from "../components/Button";
import style from "./Cart.css";
import RandomProducts from "../components/RandomProducts";
import Header from "../components/Header";

class Cart extends React.Component {
  render() {
    console.log("deas")
    return (
      <div>
        <Container>
          <Row>
            <Col md="8" style={{ paddingTop: "4%" }}>
              <CartViewProduct />

              <CartViewProduct />
              <CartViewProduct />
            </Col>
            <Col md="4">
              <Container className="conta">
                <h4 className="tit">RESUMEN</h4>
                <hr />
                <div className="txt">
                  <p className="txt">MAP Cantidad de productos</p>
                  <hr />
                  <Row>
                    <Col md="7">
                      <p>Total de productos</p>
                    </Col>
                    <Col md="5">
                      <p className="txt2">$ MAP NRO</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="7">
                      <p>Envío</p>
                    </Col>
                    <Col md="5">
                      <p className="txt2">$ MAP NRO</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="7">
                      <b>
                        <p>Total</p>
                      </b>
                    </Col>
                    <Col md="5">
                      <b>
                        <p className="txt2">$ MAP NRO</p>
                      </b>
                    </Col>
                  </Row>
                </div>
                <div style={{ margin: "3% 30%", padding: "8% 0" }}>
                  <Button1 buttonTxt={"Continuar"} />
                </div>
              </Container>
            </Col>
          </Row>
          <div style={{ padding: "5% 0 2% 0" }}>
            <Header>También te puede gustar</Header>
          </div>
          <RandomProducts />
        </Container>
      </div>
    );
  }
}

export default Cart;

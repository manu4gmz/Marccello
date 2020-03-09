import React, { Component, Fragment } from "react";
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Card,
  CardDeck,
  Image,
  Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Button1 from "../components/Button.jsx";
import Header from "../components/Header";
import "./Landing.css";

export default class Landing extends Component {
  render() {
    return (
      <Fragment>
        <Jumbotron fluid className="mainHero">
          <Container>
            <Col md="6" className="px-0">
              <h1>
                Probalo <br />y conoccello
              </h1>
            </Col>
            <br />
            <Link to="/productos">
              <Button1 buttonTxt={"Quiero comprar"} />
            </Link>
            {/* <p>Agachate y conocelo</p> */}
          </Container>
        </Jumbotron>
        <Container>
          <Header>Cómo comprar</Header>

          <Row className="text-center" style={{ marginTop: "6%" }}>
            <Col md="4" className="px-5">
              <Link to="/productos">
                <Image
                  className="mb-4"
                  fluid="true"
                  variant="top"
                  src="assets/ComoComprar-03.png"
                />
              </Link>
              <h3 className="comprarTxt">Elegí</h3>
            </Col>
            <Col md="4" className="px-5">
              <Image
                className="mb-4"
                fluid="true"
                variant="top"
                src="assets/ComoComprar-04.png"
              />
              <h3 className="comprarTxt">Pagá</h3>
            </Col>
            <Col md="4" className="px-5">
              <Image
                className="mb-4"
                fluid="true"
                variant="top"
                src="assets/ComoComprar-05.png"
              />
              <h3 className="comprarTxt">Recibí</h3>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

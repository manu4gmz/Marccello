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
import Button1 from "../components/Button.jsx";
import Header from "../components/Header";

export default class Landing extends Component {
  render() {
    const img = {
      backgroundImage: "url(assets/ice-cream-with-berries-PA9XYSLslide.jpg)",
      backgroundSize: "100%",
      backgroundAttachment: "fixed",
      height: "700px"
    };
    return (
      <Fragment>
        <Jumbotron fluid style={img}>
          <Container>
            <Col md="5" className="px-0">
              <h1
                style={{
                  paddingTop: "33%",
                  color: "#ffffff",
                  fontSize: "65px",
                  fontWeight: "700"
                }}
              >
                Probalo <br />y conoccello
              </h1>
            </Col>
            <br />
            <Button1 buttonTxt={"Quiero comprar"} />
            {/* <p>Agachate y conocelo</p> */}
          </Container>
        </Jumbotron>
        <Container>
          <Header>Comprá</Header>

          <Row className="text-center">
            <Col md="4" className="px-5">
              <Image
                className="mb-4"
                fluid="true"
                roundedCircle="true"
                variant="top"
                src="http://via.placeholder.com/300"
              />
              <h3>Elegí</h3>
              {/* <p>lorem ipsum asda as assas as asa as</p> */}
            </Col>
            <Col md="4" className="px-5">
              <Image
                className="mb-4"
                fluid="true"
                roundedCircle="true"
                variant="top"
                src="http://via.placeholder.com/300"
              />
              <h3>Pagá</h3>
              {/* <p>lorem ipsum asda as assas as asa as</p> */}
            </Col>
            <Col md="4" className="px-5">
              <Image
                className="mb-4"
                fluid="true"
                roundedCircle="true"
                variant="top"
                src="http://via.placeholder.com/300"
              />
              <h3>Recibí</h3>
              {/* <p>lorem ipsum asda as assas as asa as</p> */}
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

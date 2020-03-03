import React from "react";
import { Row, Col, Container, Image, Jumbotron } from "react-bootstrap";
import Header from "./Header";
import Button1 from "./Button";
import ProductModule from "./ProductModule";

export default props => {
  const img = { backgroundImage: "url(https://i.imgur.com/Jl1AI4w.jpg)" };
  return (
    <div>
      <Jumbotron style={img}>
        <Container>
          <Col md="5" className="px-0">
            <h1
              style={{
                color: "#6b4856",
                fontSize: "45px",
                fontWeight: "700"
              }}
            >
              Helados <br />
              artesanales
            </h1>
          </Col>
        </Container>
      </Jumbotron>
      <Container>
        <Header>Productos</Header>
        {/* <Row>
          <Col md="4">Helados | Paletas | Postres | Todo</Col>
          <Col md="4">
            <input>PRUEBA</input>
          </Col>
          <Col md="4">
            <Button1 buttonTxt={"Filtros +"} />{" "}
          </Col>
        </Row> */}

        <Row>
          {/* MAP */}

          <ProductModule />

          {/* MAP */}
        </Row>
      </Container>
    </div>
  );
};

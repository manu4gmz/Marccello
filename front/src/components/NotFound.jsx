import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
export default props => {
  return (
    <Container>
      <div style={{ paddingTop: "10%" }}>
        <Row>
          <Col md="6">
            <img
              style={{ paddingLeft: "20%", paddingBottom: "23%" }}
              src="/assets/sad-06.png"
            />
          </Col>
          <Col md="6">
            <h1
              style={{
                paddingTop: "10%",
                color: "#6b4856",
                fontSize: "60px",
                fontWeight: "700",
                display: "inline-block"
              }}
            >
              404
            </h1>
            <br />
            <h3
              style={{
                color: "#6b4856",
                fontWeight: "700",
                display: "inline-block"
              }}
            >
              NOT FOUND
            </h3>
            <Link to="/">
              <h5
                style={{
                  paddingTop: "5%",
                  color: "#6b4856",
                  textDecoration: "none"
                }}
              >
                ¡Te esperamos <br />
                en nuestra página!
              </h5>
            </Link>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

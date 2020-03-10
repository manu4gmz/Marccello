import React, { Component } from "react";
import { Button } from "../components/Button";
import { Container, Col, Row } from "react-bootstrap";

export default ({ user, handlePromClick, handleDemClick }) => {
  return (
    <Container>
      <br />
      <Row>
        <Col md="5">
          <p style={{ fontSize: "18px", padding: "1%" }}>
            El usuario <b>{user.username}</b> es {user.type}. Su id es:{" "}
            {user.id}
          </p>
        </Col>
        {user.type === "admin" ? (
          <Col md="2">
            <button
              className="buttonPink1"
              value={user.id}
              onClick={handleDemClick}
            >
              Degradar
            </button>
          </Col>
        ) : (
          <Col md="2">
            <button
              className="buttonDark1"
              value={user.id}
              onClick={handlePromClick}
            >
              Promover
            </button>
          </Col>
        )}
      </Row>
    </Container>
  );
};

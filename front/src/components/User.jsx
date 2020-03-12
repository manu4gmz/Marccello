import React, { Component } from "react";
import { Button } from "../components/Button";
import { Container, Col, Row } from "react-bootstrap";

export default ({ user, handlePromClick, handleDemClick }) => {
  const date = new Date(user.createdAt);
  return (
    <Container>
      <br />
      <Row>
        <Col md="5">
          <p style={{ fontSize: "18px", padding: "1%" }}>
            <b>{user.username}</b> (usuario <i>{user.type}</i>) - 
            Creado el {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
            
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

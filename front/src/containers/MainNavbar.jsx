import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  Container,
  FormControl
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Icon from "../components/Icon";

export default class MainNavbar extends Component {


  render() {
    return (
      <Navbar bg="light" expand="lg" className="py-2">
        <Container>
          <Link to="/">
            <img
              style={{ width: "100px" }}
              src="/assets/logo/marccello-logo.svg"
            />
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/productos">Productos</Link>
            </Nav>
            <Form inline>
              <Input placeholder="Search" search={true} className="mr-sm-2" />
              <Icon src="/assets/supermarket.svg" />
              <Icon src="/assets/user.svg" />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

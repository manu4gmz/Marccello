import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  Container,
  FormControl,
  Dropdown
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Icon from "../components/Icon";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <Icon src="/assets/user.svg" />
  </a>
));

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
              <Link to="/productos" className="ml-2">Productos</Link>
            </Nav>
            <Form inline>
              <Input placeholder="Search" search={true} className="mr-sm-2" />
              <Link to="carrito"><Icon src="/assets/supermarket.svg" /></Link>

                
            <Dropdown alignRight>
              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"/>

              <Dropdown.Menu>

                <Dropdown.Item><Link to="/login">Inicia sesión</Link></Dropdown.Item>
                <Dropdown.Item><Link to="/register">Registrate</Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

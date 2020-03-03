import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from "react-bootstrap"
import { Link } from "react-router-dom";


export default class MainNavbar extends Component {
	render() {
		return (
			<Navbar bg="light" expand="lg">
			  <Navbar.Brand href="#home">
			  	<img style={{width: "140px"}} src="assets/logo/marccello-logo.svg"/>
			  </Navbar.Brand>
			  <Navbar.Toggle aria-controls="basic-navbar-nav" />
			  <Navbar.Collapse id="basic-navbar-nav">
			    <Nav className="mr-auto">
			      <Link to="/products">Productos</Link>
			   
			    </Nav>
			    <Form inline>
			      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
			      <Button variant="outline-success">Search</Button>
			    </Form>
			  </Navbar.Collapse>
			</Navbar>
		)
	}
}
import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

export default () => (
	<Container fluid className="bg-light pt-5 mt-3">
		<Container>
		<Row>
			<Col md="4">
				<img src="assets/logo/marccello-logo.svg" style={{width:"100px"}}/>
				<p>Probalo y conocelo</p>
				<hr/>

				<p>Helados artesanales</p>
			</Col>

			<Col md="4">
				Puto
			</Col>

			<Col md="4">
				ig fb
			</Col>
		</Row>
		</Container>
	</Container>
)
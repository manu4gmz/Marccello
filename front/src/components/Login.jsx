import React from "react";
import Button from './Button.jsx';
import Header from "./Header";
import { Container, Form, Row, Col } from "react-bootstrap";
import Input from "./Input.jsx";

export default class Register extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            email: "",
            password: ""
        }
    }

    handleChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit(e) {
        e.preventDefault();
    }
    render() {
    return (
        <Container className="mt-2 mb-5 pb-5">
            <Header>Iniciar sesión</Header>
            <Col md={6} className="mx-auto">
                <p>Iniciá sesión; estás a un click de cambiar tu vida.</p>
                <hr/>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Group>
                        <label>Email</label>
                        <Input onChange={this.handleChange} name='email' placeholder="elmascapito@notengoamigos.org" value={this.state.email}/>
                    </Form.Group>
                    <Form.Group>
                        <label>Contraseña</label>
                        <Input onChange={this.handleChange} name='password' type="password" placeholder="prefierousarnunjucks123" />
                    </Form.Group>
                    <Button buttonTxt={'Iniciar sesión'} />
                </Form>
            </Col>
        </Container>
    )
    }
}
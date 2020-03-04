import React from "react";
import Button from '../components/Button.jsx';
import Header from "../components/Header";
import { Container, Form, Row, Col } from "react-bootstrap";
import Input from "../components/Input.jsx";

export default class Login extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            email: "",
            password: "",
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
        <Container className="mt-2 mb-5">
            <Header>Iniciá sesión</Header>
            <Col md={6} className="mx-auto">
                <p>Iniciá sesión; estás a un click de cambiar tu vida, o al menos tu paladar. </p>
                <hr/>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Group>
                        <label>Email</label>
                        <Input onChange={this.handleChange} name='email' type="email" placeholder="elmas@capito.org" name="email" value={this.state.email} type="text"/>
                    </Form.Group>
                    <Form.Group>
                        <label>Contraseña</label>
                        <Input onChange={this.handleChange} name='password' type="password" placeholder="prefierousasnunjucks" value={this.state.password}/>
                    </Form.Group>
                    <Button buttonTxt={'Iniciar sesión'} />
                </Form>
            </Col>
        </Container>
    )
    }
}
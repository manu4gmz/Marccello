import React from "react";
import Button from '../components/Button.jsx';
import Header from "../components/Header";
import { Container, Form, Row, Col } from "react-bootstrap";
import Input from "../components/Input.jsx";

export default class Register extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            email: "",
            password: "",
            username: ""
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
            <Header>Registrate</Header>
            <Col md={6} className="mx-auto">
                <p>Creá tu cuenta y disfrutá de los mejores helados de la zona, fabricados por los mejores artesanos traidos de Italia en drones. </p>
                <hr/>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Group>
                        <label>Nombre de usuario</label>
                        
                        <Input onChange={this.handleChange} name='username' placeholder="Pepe Capo" value={this.state.username}  type="text"/>
                    </Form.Group>
                    <Form.Group>
                        <label>Email</label>
                        <Input onChange={this.handleChange} name='email' type="email" placeholder="pepecrack10220@aguantemessi.com.ar" name="email" value={this.state.email} type="text"/>
                    </Form.Group>
                    <Form.Group>
                        <label>Contraseña</label>
                        <Input onChange={this.handleChange} name='password' type="password" placeholder="angularesmejor327" value={this.state.password}/>
                    </Form.Group>
                    <Button buttonTxt={'Registrar'} />
                </Form>
            </Col>
        </Container>
    )
    }
}
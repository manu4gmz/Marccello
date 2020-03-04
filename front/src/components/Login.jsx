import React, { Component } from "react";
import { Form } from "react-bootstrap";
import Button from './Button'

export default ({ handleChange, handleSubmit }) => (
    <Form>
        <Form.Group onSubmit={handleSubmit} controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={handleChange} name='inputEmail' type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
    </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handleChange} name='inputPassword' type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
  </Button>
    </Form>

)


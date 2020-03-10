import React from 'react'
import { Form, Container, Row, Col } from 'react-bootstrap'
import Button from "./Button"
import Header from "./Header"

export default ({ handleChange, handleSubmit, state }) => {
    console.log('AAAAAAAAAAAAA', state)
    return (<Form onSubmit={handleSubmit}>
        <Container >
            <br />
            <Header>Editar producto</Header>
            <Row>
                <Col md="6">
                    <Form.Group controlId="name">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control value={state.inputName} onChange={handleChange} name='inputName' type="text" placeholder={state.inputName} />
                    </Form.Group>
                </Col>
                <Col md="6">

                    <Form.Group controlId="price">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control value={state.inputPrice} onChange={handleChange} name='inputPrice' type='text' placeholder={state.inputPrice} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <Form.Group controlId="stock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control value={state.inputStock} onChange={handleChange} name='inputStock' type="text" placeholder={state.inputStock} />
                    </Form.Group>
                </Col>
                <Col md="6">
                    <Form.Group controlId="visible">
                        <Form.Label>Visibilidad</Form.Label>
                        <Form.Control value={state.inputVisible} onChange={handleChange} name='inputVisible' as="select">
                            <option>true</option>
                            <option>false</option>
                        </Form.Control>
                    </Form.Group>
                </Col>

            </Row>

            <Form.Group controlId="image">
                <Form.Label>Imagen</Form.Label>
                <Form.Control value={state.inputImage} onChange={handleChange} name='inputImage' type="text" placeholder="http://imagen" />
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Descripción</Form.Label>
                <Form.Control value={state.descriptionInput} onChange={handleChange} name="descriptionInput" rows="3" />
            </Form.Group>
            <div style={{ paddingBottom: "60px" }}>
                <Button buttonTxt={'Update'} />

            </div>
        </Container >

    </Form>)
}
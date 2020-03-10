import React from 'react'
import { Form, Container, Row, Col } from 'react-bootstrap'
import Button from "./Button"
import Header from "./Header"

export default ({ handleChange, handleSubmit }) => {
    return (<Form onSubmit={handleSubmit}>
        <Container >

            <br />
            <Header>Agregar un nuevo producto</Header>
            <Row>
                <Col md="6">
                    <Form.Group controlId="name">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control onChange={handleChange} name='inputName' type="text" placeholder="Nombre del producto" />
                    </Form.Group>
                </Col>
                <Col md="6">

                    <Form.Group controlId="price">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control onChange={handleChange} name='inputPrice' type='text' placeholder="00.00" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <Form.Group controlId="stock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control onChange={handleChange} name='inputStock' type="text" placeholder="10" />
                    </Form.Group>
                </Col>
                <Col md="6">
                    <Form.Group controlId="visible">
                        <Form.Label>Visibilidad</Form.Label>
                        <Form.Control onChange={handleChange} name='inputVisible' as="select">
                            <option>true</option>
                            <option>false</option>
                        </Form.Control>
                    </Form.Group>
                </Col>

            </Row>

            <Form.Group controlId="image">
                <Form.Label>Imagen</Form.Label>
                <Form.Control onChange={handleChange} name='inputImage' type="text" placeholder="http://imagen" />
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Descripción</Form.Label>
                <Form.Control onChange={handleChange} name="descriptionInput" rows="3" />
            </Form.Group>
            <div style={{ paddingBottom: "60px" }}>
                <Button buttonTxt={'Confirmar'} />

            </div>

        </Container >

    </Form>)
}
import React from "react";
import Button from "../components/Button.jsx";
import Header from "../components/Header";
import { Container, Form, Row, Col } from "react-bootstrap";
import Input from "../components/Input.jsx";
import { connect } from "react-redux";
import { createUser } from "../store/actions/users";

class Register extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: "",
      email: "",
      password: ""
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let obj = {
      username: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value
    };
    this.props.createUser(obj).then(() => this.props.history.push("/login"));
  }
  render() {
    return (
      <Container className="mt-2 mb-5">
        <div style={{ padding: "2%" }}></div>

        <br />
        <br />

        <Row>
          <Col md="5">
            <div style={{ paddingLeft: "20%" }}>
              <img src="/assets/happy-09.png" />
            </div>
          </Col>
          <Col md="7" className="mx-auto">
            <Header>
              Nos alegra recibirte <b>¡Registrate!</b>
            </Header>
            <p>
              <b>Creá tu usuario para recibir los mejores helados en dron.</b>
            </p>
            <hr />
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <label>Nombre de usuario</label>

                <Input
                  onChange={this.handleChange}
                  name="username"
                  placeholder="Juan"
                  value={this.state.username}
                  type="text"
                />
              </Form.Group>
              <Form.Group>
                <label>Email</label>
                <Input
                  onChange={this.handleChange}
                  name="email"
                  type="email"
                  placeholder="juan@email.com"
                  name="email"
                  value={this.state.email}
                  type="text"
                />
              </Form.Group>
              <Form.Group>
                <label>Contraseña</label>
                <Input
                  onChange={this.handleChange}
                  name="password"
                  type="password"
                  //placeholder="********"
                  value={this.state.password}
                />
              </Form.Group>
              <Button buttonTxt={"Registrarme"} />
            </Form>
          </Col>
        </Row>
        <div style={{ padding: "3%" }}></div>
      </Container>
    );
  }
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    createUser: user => dispatch(createUser(user))
  };
};

export default connect(null, mapDispatchToProps)(Register);

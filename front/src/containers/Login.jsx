import React from "react";
import Button from "../components/Button.jsx";
import Header from "../components/Header";
import { Container, Form, Row, Col } from "react-bootstrap";
import { login } from "../store/actions/login";
import { connect } from "react-redux";
import Input from "../components/Input.jsx";
import { fetchCart } from "../store/actions/cart";
import { setNotification } from "../store/actions/notif";
import { moveLocalToLogged } from "../store/actions/cart";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.username && this.state.password) {
      let obj = {
        username: this.state.username,
        password: this.state.password
      };
      this.props
        .login(obj)
        .then(redirect => {
          this.setState({ error: false });
          return redirect;
        })
        .then(redirect => {
          if (redirect) this.props.history.push("/");
          this.props.moveLocalToLogged().then(() => this.props.fetchCart());
          this.props.setNotification(`Bienvenido ${obj.username}`);
          console.log("REDIRECT \n\n\n\n", redirect);
        })
        .catch(() => this.setState({ error: true }));
    }
  }
  render() {
    const alertStyle = {
      borderRadius: "30px",
      marginTop: "17px"
    };

    return (
      <Container className="mt-2 mb-5">
        <div style={{ padding: "2%" }}></div>

        <br />
        <br />
        <Row>
          <Col md="5">
            <div style={{ paddingLeft: "20%" }}>
              <img src="/assets/happy-10.png" />
            </div>
          </Col>
          <Col md="7" className="mx-auto">
            <Header>
              <b>¡Volviste!</b> Te extrañábamos
            </Header>

            <b>
              <p>Ingresá tus datos. </p>
            </b>
            <hr />
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <label>Username</label>
                <Input
                  onChange={this.handleChange}
                  name="username"
                  type="text"
                  placeholder="juan@email.com"
                  value={this.state.username}
                />
              </Form.Group>
              <Form.Group>
                <label>Contraseña</label>
                <Input
                  onChange={this.handleChange}
                  name="password"
                  type="password"
                  placeholder="********"
                  value={this.state.password}
                />
                {this.state.error ? (
                  <div
                    className="alert alert-danger"
                    style={alertStyle}
                    role="alert"
                  >
                    El nombre de usuario o contraseña es incorrecto
                  </div>
                ) : null}
              </Form.Group>
              <Link to="/register"> O creá un nuevo usuario.</Link>
              <br />
              <br />

              <Button type="submit" buttonTxt={"Iniciar sesión"} />
            </Form>
          </Col>
        </Row>
        <div style={{ padding: "3%" }}></div>
      </Container>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: user => dispatch(login(user)),
    logout: () => dispatch(logout()),
    fetchCart: () => dispatch(fetchCart()),
    setNotification: message => dispatch(setNotification(message)),
    moveLocalToLogged: cart => dispatch(moveLocalToLogged(cart))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

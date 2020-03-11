import React from "react";
import Button from "../components/Button.jsx";
import Header from "../components/Header";
import { Container, Form, Row, Col } from "react-bootstrap";
import Resume from "../components/Resume";
import { connect } from "react-redux";
import Input from "../components/Input.jsx";
import { fetchCart } from "../store/actions/cart";
import { purchaseCart } from "../store/actions/purchase";
import { setNotification } from "../store/actions/notif";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      card1: "",
      card2: "",
      card3: "",
      dni: "",
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
    if (this.state.address) {
      let obj = {
        address: this.state.address
      };

      this.props.purchaseCart(this.state.address).then(() => {
        this.props.fetchCart();
        this.props.history.push("/");
      });
    }
  }
  render() {
    const alertStyle = {
      borderRadius: "30px",
      marginTop: "17px"
    };

    return (
      <Container className="mt-2 mb-5">
        <Row>
          <Col md={8}>
            <br />
            <br />

            <Header>Completá tus datos</Header>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <label>Número de tarjeta</label>
                <Input
                  onChange={this.handleChange}
                  name="card1"
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={this.state.card1}
                />
              </Form.Group>
              <Form.Group>
                <label>Código de seguridad</label>
                <Input
                  onChange={this.handleChange}
                  name="card2"
                  placeholder="XXXX"
                  value={this.state.card2}
                />
              </Form.Group>
              <Form.Group>
                <label>Fecha de Vencimiento</label>
                <Input
                  onChange={this.handleChange}
                  name="card3"
                  placeholder="MM AAAA"
                  value={this.state.card3}
                />
              </Form.Group>
              <Form.Group>
                <label>DNI</label>
                <Input
                  onChange={this.handleChange}
                  name="dni"
                  placeholder=""
                  value={this.state.dni}
                />
              </Form.Group>
              <Header>Seleccioná tu ubicación</Header>
              <Form.Group>
                <label>Dirección</label>
                <Input
                  onChange={this.handleChange}
                  name="address"
                  type="text"
                  placeholder="Avenida Siempreviva 742"
                  value={this.state.username}
                />
              </Form.Group>
              {this.state.address.length > 5 ? (
                <iframe
                  style={{ width: "100%", border: "none", height: "300px" }}
                  src={`http://maps.google.com/maps?q=${this.state.address.replace(
                    / /g,
                    "+"
                  )}&output=embed`}
                ></iframe>
              ) : null}
              {/*
                <iframe width="100%" height="400px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.com/maps?hl=en&amp;ie=UTF8&amp;ll=-34.5779849,-58.4488466&amp;spn=56.506174,79.013672&amp;t=m&amp;z=4&amp;output=embed&amp;z=17"></iframe>*/}

              {this.state.error ? (
                <div
                  className="alert alert-danger"
                  style={alertStyle}
                  role="alert"
                >
                  El nombre de usuario o contraseña es incorrecto.
                </div>
              ) : null}

              <p>
                Marcello se compromete a hacer la entrega, pero no a garantizar
                la integridad de quienes atenten contra el dron.
              </p>
              <hr />
              <Button type="submit" buttonTxt={"Confirmar Compra"} />
            </Form>
          </Col>
          <Col md={4}>
            <Resume cart={this.props.cart} />
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart.products
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    setNotification: message => dispatch(setNotification(message)),
    purchaseCart: address => dispatch(purchaseCart(address))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

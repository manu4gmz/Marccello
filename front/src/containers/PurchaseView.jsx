import React, { Component, Fragment } from "react";
import { Row, Col, Container, Image, Form } from "react-bootstrap";
import Header from "../components/Header";
import { connect } from "react-redux";
import {
  getDroneCoords,
  getPurchase,
  resolvePurchase
} from "../store/actions/purchase";
import { Link } from "react-router-dom";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";

class PurchaseView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coords: "",
      distance: 0,
      status: "preparing"
    };
    this.getCoords = this.getCoords.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  getCoords() {
    this.props.getDroneCoords(this.props.match.params.id).then(data => {
      this.setState({ coords: data.x + "," + data.y, distance: data.distance });
    });
  }

  getStatus() {
    this.props.getPurchase(this.props.match.params.id).then(data => {
      console.log(data.status);
      this.setState({ status: data.status });

      if (data.status == "resolved") return;

      if (data.status == "ongoing") this.getCoords();

      if (data.status == "preparing") setTimeout(this.getStatus, 5000);
    });
  }

  componentDidMount() {
    this.getStatus();
  }

  handleConfirm() {
    this.props.resolvePurchase(this.props.match.params.id).then(() => {
      this.setState({ status: "resolved" });
    });
  }

  render() {
    return (
      <div>
        <Container>
          {this.state.status == "preparing" ? (
            <Fragment>
              <div style={{ paddingTop: "10%" }}>
                <Row>
                  <Col
                    md="6"
                    style={{ paddingLeft: "20%", paddingBottom: "10%" }}
                  >
                    <img src="/assets/happy-12.png" />
                  </Col>
                  <Col md="6">
                    <h1
                      style={{
                        paddingTop: "25%",
                        color: "#6B4856",
                        fontWeight: "700"
                      }}
                    >
                      Tu pedido
                      <br />
                      está siendo
                      <br />
                      preparado.
                    </h1>
                  </Col>
                </Row>
              </div>
            </Fragment>
          ) : null}
          {this.state.status == "ongoing" ? (
            <Fragment>
              {this.state.distance < 0.0002 ? (
                <Fragment>
                  <h1
                    style={{
                      color: "#6B4856",
                      fontWeight: "700",
                      paddingTop: "5%",
                      textAlign: "center"
                    }}
                  >
                    ¡El dron llegó a tu ubicación!
                  </h1>
                  <h5
                    style={{
                      color: "#6B4856",
                      fontWeight: "500",
                      paddingBottom: "3%",
                      textAlign: "center"
                    }}
                  >
                    ¿Qué esperás? ¡Buscalo!
                  </h5>
                </Fragment>
              ) : (
                <h2
                  style={{
                    color: "#6B4856",
                    fontWeight: "700",
                    padding: "5% 0",
                    textAlign: "center"
                  }}
                >
                  El dron está volando hacia vos.
                </h2>
              )}
              {this.state.distance < 0.0002 ? (
                <div
                  style={{
                    width: "250px",
                    marginLeft: "calc(50% - 70px)",
                    marginBottom: "3%"
                  }}
                >
                  <Button
                    onClick={this.handleConfirm}
                    buttonTxt={"Confirmar"}
                  />
                </div>
              ) : null}
              {this.state.coords ? (
                <iframe
                  onLoad={() => setTimeout(this.getCoords, 5000)}
                  style={{ width: "100%", border: "none", height: "300px" }}
                  src={`http://maps.google.com/maps?q=${this.state.coords}&output=embed&z=17`}
                ></iframe>
              ) : null}
            </Fragment>
          ) : null}
          {this.state.status == "resolved" ? (
            <Fragment>
              <div style={{ paddingTop: "10%" }}></div>
              <Row>
                <Col
                  md="6"
                  style={{ paddingLeft: "20%", paddingBottom: "10%" }}
                >
                  <img src="/assets/happy-11.png" />
                </Col>
                <Col md="6">
                  <h1
                    style={{
                      paddingTop: "25%",
                      color: "#6B4856",
                      fontWeight: "700"
                    }}
                  >
                    ¡Disfrutalo!
                  </h1>
                  <h5
                    style={{
                      color: "#6B4856",
                      fontWeight: "500",
                      paddingBottom: "5%"
                    }}
                  >
                    Gracias por tu compra
                  </h5>
                  <Link to="/">
                    <Button buttonTxt={"Inicio"} />
                  </Link>
                </Col>
              </Row>
              <div />
            </Fragment>
          ) : null}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    order: state.order.order
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    getDroneCoords: id => dispatch(getDroneCoords(id)),
    getPurchase: id => dispatch(getPurchase(id)),
    resolvePurchase: id => dispatch(resolvePurchase(id))
  };
};

export default connect(null, mapDispatchToProps)(PurchaseView);

import React, { Component, Fragment } from "react";
import { Row, Col, Container, Image, Jumbotron } from "react-bootstrap";
import Header from "../components/Header";
import Button1 from "../components/Button";
import ProductModule from "../components/ProductModule";
import { fetchPurchases } from "../store/actions/purchases";
import { connect } from "react-redux";
import Input from "../components/Input";

class Purchases extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPurchases();
  }

  render() {
    const { purchases } = this.props;
    return (
      <div>
        <Container>
          <br />
          <br />
          <Header>Compras hechas</Header>
          <Row>
            {purchases.map(purchase => {
              const date = new Date(purchase.createdAt);
              return (
                <Col md="4">
                  <div key={purchase.id} className="conta">
                    <div
                      style={{
                        paddingTop: "10%",
                        paddingLeft: "5%",
                        paddingRight: "4%",
                        margin: "3%"
                      }}
                    >
                      {purchase.products.map(product => {
                        return (
                          <div key={product.id}>
                            <p style={{ fontSize: "18px" }}>
                              <b>{product.name}</b> x{" "}
                              {product.product_purchase.amount}
                            </p>
                          </div>
                        );
                      })}

                      <hr />
                      <p>
                        {" "}
                        <b>Fecha de compra:</b>
                        <br />
                        {date.getDate()}/{date.getMonth()}/{date.getFullYear()}{" "}
                        - {date.getHours()}:{date.getMinutes()}{" "}
                      </p>
                      <p>
                        <b>Dirección de envío:</b>
                        <br />
                        {purchase.address}
                      </p>
                      <p> $ {purchase.total} </p>

                      <hr />
                      <p>
                        <i>{purchase.status}</i>
                      </p>
                      <br />
                      <br />
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
        <div style={{ padding: "5%" }}></div>
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    purchases: state.purchases.purchases
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    fetchPurchases: () => dispatch(fetchPurchases())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Purchases);

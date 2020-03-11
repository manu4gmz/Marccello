import React, { Component } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import Header from "../components/Header";
import { connect } from "react-redux";
import { fetchOrders } from "../store/actions/order";
import { Link } from "react-router-dom";

class Orders extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchOrders();
    //console.log("\n\n\n\nEEU\n\n\n",this.props.match.params.index)
    //this.props.setPage()
  }

  render() {
    return (
      <div>
        <Container>
          <br />
          <br />

          <Header>Órdenes</Header>
          {this.props.orders.map(order => {
            const ago = Math.floor(
              (new Date() - new Date(order.createdAt)) / 60000
            );
            return (
              <Row>
                <Link key={order.id} to={`/admin/orders/${order.id}`}>
                  <h4>{order.address}</h4>
                  <p className="text-muted"> </p>
                </Link>
                <p style={{ paddingLeft: "10px", paddingTop: "3px" }}>
                  Hace {} minutos
                </p>
              </Row>
            );
          })}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    orders: state.order.orders
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    fetchOrders: () => dispatch(fetchOrders())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

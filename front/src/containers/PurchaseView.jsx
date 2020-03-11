import React, { Component, Fragment } from "react";
import { Row, Col, Container, Image, Form  } from "react-bootstrap";
import Header from "../components/Header";
import { connect } from "react-redux";
import { getDroneCoords, getPurchase, resolvePurchase } from "../store/actions/purchase";
import { Link } from "react-router-dom";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx"

class PurchaseView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coords: "",
      distance: 0,
      status: "preparing",
    }
    this.getCoords = this.getCoords.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  getCoords () {
    this.props.getDroneCoords(this.props.match.params.id)
      .then(data => {
        this.setState({ coords: data.x+","+data.y, distance: data.distance});
      });
  }

  getStatus() {
    this.props.getPurchase(this.props.match.params.id)
    .then(data => {
      console.log(data.status)
      this.setState({status: data.status});

      if (data.status == "resolved") return;
      
      if (data.status == "ongoing") this.getCoords();

      if (data.status == "preparing") setTimeout(this.getStatus, 5000);
    })
  }

  componentDidMount() {
    //-34.571361,-58.476732
    this.getStatus();

  }

  handleConfirm () {
    this.props.resolvePurchase(this.props.match.params.id)
    .then(()=>{
      this.setState({status: "resolved"})

    })
  }

  render() {
    return (
      <div>
        <Container> 
          {
            this.state.status == "preparing" ?

            <Fragment>
              <h1>Tu pedido está siendo preparado</h1>
              <p>Espera pacientemente que pronto tu dron estará saliendo.</p>
            </Fragment>
            : null
          }
          {
            this.state.status == "ongoing" ?
              <Fragment>
              {
                this.state.distance < 0.0002 ?
                <Fragment>
                <h1>¡Tu dron se encuentra en tu ubicación!</h1>
                <p>¿Qué esperás? ¡Andá a buscarlo!</p>
                </Fragment>

                : <h2>Tu dron está a volando hacia ti.</h2>

              }
              {
                this.state.coords ? 
                  <iframe onLoad={()=>setTimeout(this.getCoords, 5000)} style={{width: "100%", border: "none", height: "300px"}} src={`http://maps.google.com/maps?q=${this.state.coords}&output=embed&z=17`}></iframe>
                  : null
              }
              {
                this.state.distance < 0.0002 ? 
                <Button onClick={this.handleConfirm}>Recibí mi compra</Button>: null
              }
              </Fragment>
              : null 

        }
        {
            this.state.status == "resolved" ?
            <Fragment>
              <h1>¡Disfrutá tu helado!</h1>
              <p>Muchas gracias por tu compra</p>
            </Fragment>
            : null
          }
           
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
    getDroneCoords: (id) => dispatch(getDroneCoords(id)),
    getPurchase: id => dispatch(getPurchase(id)),
    resolvePurchase: id => dispatch(resolvePurchase(id))
  };
};

export default connect(null, mapDispatchToProps)(PurchaseView);

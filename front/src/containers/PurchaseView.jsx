import React, { Component } from "react";
import { Row, Col, Container, Image, Form  } from "react-bootstrap";
import Header from "../components/Header";
import { connect } from "react-redux";
import { getDroneCoords } from "../store/actions/purchase";
import { Link } from "react-router-dom";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx"

class PurchaseView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coords: "",
      distance: 0,
    }
    this.getCoords = this.getCoords.bind(this);
  }

  getCoords () {
    this.props.getDroneCoords(this.props.match.params.id)
      .then(rta => rta.data)
      .then(data => {
        this.setState({ coords: data.x+","+data.y, distance: data.distance});
      })
  }

  componentDidMount() {
    this.getCoords();

  }

  render() {
    return (
      <div>
        <Container>
        
          <h2>Tu dron está a {this.state.distance} de ti.</h2>
          {
            this.state.coords ? 
              <iframe onLoad={()=>setTimeout(this.getCoords, 5000)} style={{width: "100%", border: "none", height: "300px"}} src={`http://maps.google.com/maps?q=${this.state.coords}&output=embed&z=17`}></iframe>
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
    getDroneCoords: (id) => dispatch(getDroneCoords(id))
  };
};

export default connect(null, mapDispatchToProps)(PurchaseView);

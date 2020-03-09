import React, { Component } from "react";
import { Row, Col, Container, Image, Form  } from "react-bootstrap";
import Header from "../components/Header";
import { connect } from "react-redux";
import { fetchOrder, sendDrone } from "../store/actions/order";
import { Link } from "react-router-dom";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx"

class SingleOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coords: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCoord = this.handleCoord.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    console.log(this.props.match.params)
    this.props.fetchOrder(this.props.match.params.id);
    //console.log("\n\n\n\nEEU\n\n\n",this.props.match.params.index)
    //this.props.setPage()
  }

  handleChange(e) {
    this.setState({[e.target.name]:e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.sendDrone(this.props.match.params.id, this.state.coords);
  }

  handleCoord(e,i,a) {
    e.preventDefault();
    const coords = this.state.coords;
    const splited = coords.split(",")
    splited[i] = (Number(splited[i])+ a)+"";
    this.setState({coords: splited.join(",")})
  }

  render() {
    const { order } = this.props;

    if (!order.createdAt) return null;
    const ago = Math.floor(((new Date())-(new Date(order.createdAt)))/60000)
    return (
      <div>
        <Container>
        <Row>
        <Col md={6}>
          <Header>Pedido</Header>
          <h1>{order.address}</h1>        
          <p>Hace {ago} minutos</p>
          <table>
            <thead>
              <tr>
                <td>Product</td>
                <td>Cantidad</td>
                <td>Stock</td>
                <td>Precio/unidad</td>
              </tr>
            </thead>
            <tbody>
              {
                order.products.map(product => (
                  <tr>
                    <td>{product.name}</td>
                    <td>{product.product_purchase.amount}</td>
                    <td>{product.stock}</td>
                    <td>{product.price}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <iframe style={{width: "100%", border: "none", height: "300px"}} src={`http://maps.google.com/maps?q=${order.address.replace(/ /g, "+")}&output=embed`}></iframe> 
        </Col>
        <Col md="6">
          <Header>Dron</Header>

          <Form onSubmit={this.handleSubmit}>
            <Form.Group>

              <h4>Coordenadas de entrega</h4>
              <Input onChange={this.handleChange} name='coords' placeholder="" value={this.state.coords}/>
              <Row>
               <Col md={6}>
                <button
                onClick={e=>this.handleCoord(e,0,-0.00008)}
                  className={"bot"}
                  style={{ marginLeft: "5px" }}
                >
                  -
                </button>
                <p className="price">{this.state.coords.split(",")[0]}</p>
                <button
                onClick={e=>this.handleCoord(e,0,0.00008)}
                  className={"bot"}
                  style={{ marginLeft: "5px" }}
                >
                  +
                </button>
              </Col>
              <Col md={6}>
                <button
                onClick={e=>this.handleCoord(e,1,-0.00008)}

                  className={"bot"}
                  style={{ marginLeft: "5px" }}
                >
                  -
                </button>
                <p className="price">{this.state.coords.split(",")[1]}</p>
                <button
                onClick={e=>this.handleCoord(e,1,0.00008)}

                  className={"bot"}
                  style={{ marginLeft: "5px" }}
                >
                  +
                </button>
              </Col>
              </Row>
              <p>Puedes acceder a las coordenas en el URL de la pagina que te lleva la pestaña de la ubicacion real en <strong>ampliar mapa</strong>. Se haya después del <strong>@</strong>.</p>
            </Form.Group>
          {
            this.state.coords ?
                
                <iframe style={{width: "100%", border: "none", height: "300px"}} src={`http://maps.google.com/maps?q=${this.state.coords}&output=embed&z=17`}></iframe>
                
                : null
            }
            <Button type="submit" buttonTxt={'Enviar dron'} />

          </Form>
        </Col>
        </Row>
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
    fetchOrder: (id) => dispatch(fetchOrder(id)),
    sendDrone: (id, coords) => dispatch(sendDrone(id, coords))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);

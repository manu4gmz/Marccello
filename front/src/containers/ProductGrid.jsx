import React, { Component } from "react";
import { Row, Col, Container, Image, Jumbotron } from "react-bootstrap";
import Header from "../components/Header";
import Button1 from "../components/Button";
import ProductModule from "../components/ProductModule";
import {connect} from 'react-redux'
import {fetchProducts, fetchProduct} from '../store/actions/products'

class ProductGrid extends React.Component {

  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  componentWillMount () {
    this.props.fetchProducts()
  }

  handleInput (e) {
    console.log(e.target.value)
  }

  handleSubmit (e) {
    e.preventDefault()
    const product = e.target[0].value
    console.log(e.target[0].value)
    this.props.fetchProducts(product)
  }

  render () {

    const img = {  
    backgroundImage: "url(https://i.imgur.com/Jl1AI4w.jpg)",
    backgroundSize: "100%",
    backgroundAttachment: "fixed",
    height: "323px",
  
  };    
    const {products} = this.props 
    return (
      <div>
        <Jumbotron style={img}>
          <Container>
            <Col md="5" className="px-0">
              <h1
                style={{
                  color: "#6b4856",
                  fontSize: "45px",
                  fontWeight: "700"
                }}
              >
                Helados <br />
                artesanales
              </h1>
            </Col>
          </Container>
        </Jumbotron>
        <Container>
          <Header>Productos</Header>
          
          <form onSubmit = {this.handleSubmit}>
              <label for="input">Busca productos</label>
              <input name="name" type="text" id="input" onChange = {this.handleInput}/>
              <button type="submit">Submit</button>
          </form>

          {/* <Row>
            <Col md="4">Helados | Paletas | Postres | Todo</Col>
            <Col md="4">
              <input>PRUEBA</input>
            </Col>
            <Col md="4">
              <Button1 buttonTxt={"Filtros +"} />{" "}
            </Col>
          </Row> */}

          <Row>
            {/* MAP */}
            {products.map(product => 
              <ProductModule product = {product}/>
            )}
            {/* MAP */}
          </Row>
        </Container>
      </div>
    );
  }
};

const mapStateToProps = function (state, ownProps) {
  console.log(state);
  
  return {
      products: state.productReducer.products
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid)
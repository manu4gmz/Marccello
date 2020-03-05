import React, { Component } from "react";
import { Row, Col, Container, Image, Jumbotron } from "react-bootstrap";
import Header from "../components/Header";
import Button1 from "../components/Button";
import ProductModule from "../components/ProductModule";
import { connect } from "react-redux";
import { fetchProducts, fetchProduct } from "../store/actions/products";
import Input from "../components/Input";

class ProductGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    this.props.fetchProducts();
  }

  handleInput(e) {
    this.setState({ product: e.target.value });
    const product = e.target.value;
    product.length >= 2
      ? this.props.fetchProducts(product)
      : this.props.fetchProducts();
  }

  onClick(id) {
    this.props.fetchProduct(id);
    this.props.history.push('/producto')
  }

  render() {
    const img = {
      backgroundImage:
        "url(assets/summer-chocolate-ice-cream-P7YWKEYslide.jpg)",
      backgroundSize: "100%",
      backgroundAttachment: "fixed",
      height: "323px"
    };
    const { products } = this.props;
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

          <Col md = {3}>
            <Input
            name="name" 
            placeholder="Search" 
            search={true} 
            className="mr-sm-2"
            id="input"
            onChange={this.handleInput}
            value={this.state.product} 
            />
          </Col>

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
            {products.map(product => (
              <ProductModule product={product} onClick = {this.onClick}/>
            ))}
            {/* MAP */}
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  console.log(state);

  return {
    products: state.productReducer.products
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    fetchProducts: products => dispatch(fetchProducts(products)),
    fetchProduct: id => dispatch(fetchProduct(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);

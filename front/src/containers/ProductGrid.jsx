import React, { Component } from "react";
import { Row, Col, Container, Image, Jumbotron } from "react-bootstrap";
import Header from "../components/Header";
import Button1 from "../components/Button";
import ProductModule from "../components/ProductModule";
import { connect } from "react-redux";
import { fetchProducts, fetchProduct, setPage } from "../store/actions/products";
import Input from "../components/Input";
import { Link } from "react-router-dom";
class ProductGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchProducts(null, this.props.match.params.index-1);
    //console.log("\n\n\n\nEEU\n\n\n",this.props.match.params.index)
    //this.props.setPage()
  }

  handleInput(e) {
    this.setState({ product: e.target.value });
    const product = e.target.value;
    product.length >= 2 ?
      this.props.fetchProducts(product)
    : this.props.fetchProducts();
    this.props.history.push(`/productos/1`)
    this.props.setPage(1);
  }

  onClick(id) {
    this.props.fetchProduct(id);
    this.props.history.push(`/producto/${id}`)
  }

  render() {
    const img = {
      backgroundImage:
        "url(/assets/summer-chocolate-ice-cream-P7YWKEYslide.jpg)",
      backgroundSize: "100%",
      backgroundAttachment: "fixed",
      height: "323px"
    };
    const { products } = this.props;
    const { cart } = this.props;
    console.log('SOY EL CARRITOOOOOOO')
    
    console.log(cart)
    
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

          <Row style={{minHeight: "80vh", marginTop: "20px"}}>
            {/* MAP */}
            {products.map(product => (
              <ProductModule alreadyCart={cart.map(p => p.id).includes(product.id)} product={product} onClick = {this.onClick} key={product.id}/>
            ))}
            {/* MAP */}
          </Row>
          <Row>
            {
              this.props.pages.map(i => 
                <Link key={i} className="mx-2" to={`/productos/${i+1}`} onClick={()=>this.props.setPage(i)}>{i+1}</Link>
              )
            }
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {


  return {
    products: state.products.page,
    pages: state.products.products.map((_,i) => i),
    cart: state.cart.products
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    fetchProducts: (products, index) => dispatch(fetchProducts(products, index)),
    fetchProduct: id => dispatch(fetchProduct(id)),
    setPage: index => dispatch(setPage(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);

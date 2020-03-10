import React, { Component, Fragment } from "react";
import { Row, Col, Container, Image, Jumbotron } from "react-bootstrap";
import Header from "../components/Header";
import Button1 from "../components/Button";
import ProductModule from "../components/ProductModule";
import { connect } from "react-redux";
import {
  fetchProducts,
  fetchProduct,
  setPage,
  fetchCatProduct
} from "../store/actions/products";
import { fetchCategories } from "../store/actions/category";
import Input from "../components/Input";
import { Link } from "react-router-dom";

class ProductGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      category: 0
    };
    this.handleInput = this.handleInput.bind(this);
    this.onClick = this.onClick.bind(this);
    this.categoryClick = this.categoryClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchProducts(null, this.props.match.params.index - 1);
    this.props.fetchCategories();
  }

  handleInput(e) {
    this.setState({ product: e.target.value });
    const product = e.target.value;
    const search = product.length >= 2 ? product : null;
    this.state.category
      ? this.props.fetchCatProduct(this.state.category, search)
      : this.props.fetchProducts(search);
    this.props.history.push(`/productos/1`);
    this.props.setPage(1);
  }

  onClick(id) {
    this.props.fetchProduct(id);
    this.props.history.push(`/producto/${id}`);
  }

  categoryClick(id) {
    this.setState({ category: id });
    id ? this.props.fetchCatProduct(id) : this.props.fetchProducts();
  }

  render() {
    const img = {
      backgroundImage:
        "url(/assets/summer-chocolate-ice-cream-P7YWKEYslide.jpg)",
      backgroundSize: "100%",
      backgroundAttachment: "fixed",
      height: "390px"
    };
    const { products, cart, categories } = this.props;

    return (
      <div>
        <Jumbotron style={img}>
          <Container>
            <Col md="5" className="px-0">
              <h1
                style={{
                  color: "#6b4856",
                  paddingTop: "11%",
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
          <Row>
            {[...categories, { id: 0, name: "Todos" }].map((category, i) => {
              return (
                <Fragment>
                  {i ? <span className="mx-2"> | </span> : null}
                  {this.state.category == category.id ? (
                    <p>
                      <strong className="d-inline ">{category.name}</strong>
                    </p>
                  ) : (
                    <p
                      className="d-inline "
                      onClick={() => this.categoryClick(category.id)}
                    >
                      {category.name}
                    </p>
                  )}
                </Fragment>
              );
            })}

            <Col md={3}>
              <div style={{ paddingLeft: "8%", marginTop: "-1%" }}>
                <Input
                  name="name"
                  placeholder="Search"
                  search={true}
                  className="mr-sm-2"
                  id="input"
                  onChange={this.handleInput}
                  value={this.state.product}
                />
              </div>
            </Col>
          </Row>

          {/* <Col md = {3}>
             <Link to="/productos" className="mr-3 text-muted">Productos</Link>
          </Col> */}

          {/* <Row>
            <Col md="4">Helados | Paletas | Postres | Todo</Col>
            <Col md="4">
              <input>PRUEBA</input>
            </Col>
            <Col md="4">
              <Button1 buttonTxt={"Filtros +"} />{" "}
            </Col>
          </Row> */}

          <Row style={{ minHeight: "80vh", marginTop: "20px" }}>
            {products.map(product => (
              <ProductModule
                alreadyCart={cart.map(p => p.id).includes(product.id)}
                product={product}
                onClick={this.onClick}
                key={product.id}
              />
            ))}
          </Row>
          <Row>
            {this.props.pages.map(i => (
              <Link
                key={i}
                className="mx-2"
                to={`/productos/${i + 1}`}
                onClick={() => this.props.setPage(i)}
              >
                {i + 1}
              </Link>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    products: state.products.page,
    pages: state.products.products.map((_, i) => i),
    cart: state.cart.products,
    categories: state.category.categories
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    fetchProducts: (products, index) =>
      dispatch(fetchProducts(products, index)),
    fetchProduct: id => dispatch(fetchProduct(id)),
    setPage: index => dispatch(setPage(index)),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchCatProduct: (id, query) => dispatch(fetchCatProduct(id, query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);

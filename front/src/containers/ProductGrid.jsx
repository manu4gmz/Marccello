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
import { Link, withRouter } from "react-router-dom";

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

class ProductGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      category: 0,
      sorting: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.onClick = this.onClick.bind(this);
    this.categoryClick = this.categoryClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.search = debounce(this.search.bind(this), 200);
  }

  search() {
    const product = this.state.product;
    const search = product.length >= 2 ? product : null;
    (this.state.category
      ? this.props.fetchCatProduct(
          this.state.category,
          search,
          this.state.sorting
        )
      : this.props.fetchProducts(search, this.state.sorting)
    ).then(() => this.props.setPage(this.props.match.params.index - 1));
    this.props.history.push(`/productos/1`);
    this.props.setPage(1);
  }

  componentDidMount() {
    this.props.fetchProducts().then(() => {
      this.props.setPage(this.props.match.params.index - 1);
    });
    this.props.fetchCategories();
  }

  handleInput(e) {
    this.setState({ product: e.target.value });
    this.search();
  }

  onClick(id) {
    this.props.fetchProduct(id);
    this.props.history.push(`/producto/${id}`);
  }

  handleSelect(e) {
    const sorting = e.target.value;
    this.setState({ sorting });
    this.search();
  }

  categoryClick(id) {
    this.setState({ category: id });
    this.search();
  }

  render() {
    const img = {
      backgroundImage:
        "url(/assets/summer-chocolate-ice-cream-P7YWKEYslide.jpg)",
      paddingBottom: "8%"
    };
    const { products, cart, categories } = this.props;

    let arr = [];
    const max = this.props.pages,
      actual = Number(this.props.match.params.index);
    for (
      let i = actual - 3 < 0 ? 0 : actual - 3;
      i < max && i < actual + 2;
      i++
    )
      arr.push(i);
    actual == 1 && max >= 4 && arr.push(3);
    actual == 1 && max >= 5 && arr.push(4);
    actual == 2 && max >= 5 && arr.push(4);

    actual == max && max - 4 >= 0 && arr.unshift(max - 4);
    actual == max && max - 5 >= 0 && arr.unshift(max - 5);
    actual == max - 1 && max - 5 >= 0 && arr.unshift(max - 5);

    return (
      <div>
        <Jumbotron style={img} className="mainHero">
          <Container>
            <Col md="5" className="px-0">
              <h1 style={{ color: "#6b4856" }}>
                Helados <br />
                artesanales
              </h1>
            </Col>
          </Container>
        </Jumbotron>
        <Container>
          <br />

          <Header>Productos</Header>
          <div style={{ padding: "1% 0" }}></div>

          <Row>
            {[...categories, { id: 0, name: "Todos" }].map((category, i) => {
              return (
                <Fragment>
                  {i ? <span className="mx-2"> | </span> : null}
                  {this.state.category == category.id ? (
                    <p>
                      <strong
                        style={{ cursor: "pointer" }}
                        className="d-inline "
                      >
                        {category.name}
                      </strong>
                    </p>
                  ) : (
                    <p
                      className="d-inline "
                      onClick={() => this.categoryClick(category.id)}
                      style={{ cursor: "pointer" }}
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

            <Col md={3} className="ml-auto">
              <div className="inputContainer">
                <select onChange={this.handleSelect}>
                  <option value="" disabled selected>
                    Filtrar
                  </option>
                  <option value="hp">Mayor precio</option>
                  <option value="lp">Menor precio</option>
                  <option value="hr">Mejor Rating</option>
                  <option value="lr">Peor Rating</option>
                </select>
              </div>
            </Col>
            <div style={{ padding: "4% 0" }}></div>
          </Row>

          <Row style={{ minHeight: "80vh"}}>
            {products.map((product, i) => (
              <ProductModule
                alreadyCart={cart.map(p => p.id).includes(product.id)}
                product={product}
                onClick={this.onClick}
                key={product.id}
                index={i}
              />
            ))}
          </Row>
          <div style={{ padding: "1%" }}></div>

          <Row className="my-5 py-3">
            <Col md="2">
              {actual !== 1 ? (
                <Link
                  className="mr-3"
                  to={`/productos/${actual - 1}`}
                  onClick={() => this.props.setPage(actual - 2)}
                >
                  Anterior
                </Link>
              ) : null}
            </Col>
            <Col md="8">
              <h5 className="text-center">
                {arr.map((i, b) => (
                  <Link
                    key={b}
                    className={
                      "mx-2 roundedPink" + (i == actual - 1 ? " active" : "")
                    }
                    to={`/productos/${i + 1}`}
                    onClick={() => this.props.setPage(i)}
                  >
                    {i + 1}
                  </Link>
                ))}
              </h5>
            </Col>
            <Col md="2">
              {actual !== max && products.length ? (
                <Link
                  className="ml-3"
                  to={`/productos/${actual + 1}`}
                  onClick={() => this.props.setPage(actual)}
                >
                  Siguiente
                </Link>
              ) : null}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    products: state.products.page,
    pages: state.products.products.length,
    cart: state.cart.products,
    categories: state.category.categories
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    fetchProducts: (s, sort) => dispatch(fetchProducts(s, sort)),
    fetchProduct: id => dispatch(fetchProduct(id)),
    setPage: index => dispatch(setPage(index)),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchCatProduct: (cat, s, sort) => dispatch(fetchCatProduct(cat, s, sort))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductGrid)
);

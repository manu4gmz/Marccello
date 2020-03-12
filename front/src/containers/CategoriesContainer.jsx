import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchCategories,
  linkCategory,
  deleteCategoryProduct
} from "../store/actions/category";
import { fetchProduct } from "../store/actions/products";
import Button from "../components/Button";
import { Image, Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";

class CategoriesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLink = this.handleLink.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchProduct(this.props.match.params.id);
  }

  handleLink(category) {
    this.props.linkCategory(this.props.match.params.id, category);
  }

  handleDelete(category) {
    this.props.deleteCategoryProduct(this.props.match.params.id, category);
  }

  handleSubmit(e) {
    e.preventDefault();
    const category = e.target[0].value;
    this.props
      .linkCategory(this.props.match.params.id, category)
      .then(() => this.props.fetchCategories());
  }

  render() {
    const { categories, product } = this.props;
    const cats = (product.categories || []).map(cat => cat.id);

    return (
      <Container>
        <div style={{ padding: "2%" }}></div>
        <Header>Seleccioná la categoría</Header>
        {categories.map(category => {
          return (
            <div>
              <Row style={{ paddingBottom: "1%" }}>
                <Col md="5">{category.name}</Col>
                <Col md="2">
                  {cats.includes(category.id) ? (
                    <Image
                      style={{
                        width: "20px",
                        display: "inline",
                        cursor: "pointer"
                      }}
                      src="/assets/bin.svg"
                      onClick={() => {
                        this.handleDelete(category.name);
                      }}
                    />
                  ) : (
                    <Image
                      style={{
                        width: "20px",
                        display: "inline",
                        cursor: "pointer"
                      }}
                      src="/assets/more.svg"
                      onClick={() => {
                        this.handleLink(category.name);
                      }}
                    />
                  )}
                </Col>
              </Row>
            </div>
          );
        })}
        <Row>
          <Col md="4">
            <form onSubmit={this.handleSubmit}>
              <div className="inputContainer">
                <input placeholder="Nueva categoría"></input>
              </div>
            </form>
          </Col>

          <Col md="2">
            <button className={"buttonPink2"}>Agregar</button>
            {/* <Button className={"buttonPink1"} buttonTxt={"Agregar"} /> */}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    categories: state.category.categories,
    product: state.products.product
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    linkCategory: (id, category) => dispatch(linkCategory(id, category)),
    deleteCategoryProduct: (id, category) =>
      dispatch(deleteCategoryProduct(id, category)),
    fetchProduct: id => dispatch(fetchProduct(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesContainer);

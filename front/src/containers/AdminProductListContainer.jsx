import React, { Component } from "react";
import { connect } from 'react-redux';
import AdminProductList from "../components/AdminProductList"
import { Row, Col, Container, Image, Jumbotron } from "react-bootstrap";
import { fetchProductsForEdit, fetchProduct, setPage, deleteProduct } from "../store/actions/products";
import { Link } from "react-router-dom"


const mapStateToProps = function (state, ownProps) {
    return {
        products: state.products.products.flat(1),
        pages: state.products.products.map((_, i) => i),
        cart: state.cart.products
    };
};

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        fetchProductsForEdit: (products, index) => dispatch(fetchProductsForEdit(products, index)),
        fetchProduct: id => dispatch(fetchProduct(id)),
        setPage: index => dispatch(setPage(index)),
        deleteProduct: productId => dispatch(deleteProduct(productId))
    };
};

class AdminProductListContainer extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.props.fetchProductsForEdit()
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md="12" style={{ paddingTop: "4%" }}>
                        {this.props.products.map(product => (
                            <AdminProductList
                                product={product}
                                deleteProduct={this.props.deleteProduct}
                                key={product.id} editProduct={this.props.editProduct}
                            />
                        ))}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductListContainer);
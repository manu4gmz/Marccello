import React from "react";
import NewProduct from "../components/NewProduct";
import { editProduct, fetchProduct } from "../store/actions/products";
import { connect } from "react-redux";
import EditProduct from "../components/EditProduct";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchProduct: product => dispatch(fetchProduct(product)),
        editProduct: (productid, product) =>
            dispatch(editProduct(productid, product))
    };
};

const mapStateToProps = function (state, ownProps) {
    return {
        product: state.products.product,
        state
    };
};

class EditProductContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputName: "",
            inputImage: "",
            inputStock: "",
            inputPrice: "",
            inputVisible: false || 'false' ? false : true,
            descriptionInput: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        this.props
            .editProduct(this.props.product.id, {
                name: this.state.inputName,
                price: Number(this.state.inputPrice),
                description: this.state.descriptionInput,
                stock: Number(this.state.inputStock),
                imgURL: this.state.inputImage,
                visible: this.state.inputVisible
            })
            .then(() => this.props.history.push("/admin/edit-product"));
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props
            .fetchProduct(id)
            .then(data => data.product)
            .then(data =>
                this.setState({
                    inputName: data.name,
                    inputImage: data.imgURL,
                    inputStock: data.stock,
                    inputPrice: data.price,
                    inputVisible: data.visible,
                    descriptionInput: data.description
                })
            );
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <EditProduct
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                state={this.state}
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProductContainer);

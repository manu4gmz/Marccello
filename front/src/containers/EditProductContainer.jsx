import React from 'react'
import NewProduct from '../components/NewProduct'
import { createProduct, fetchProduct } from '../store/actions/products'
import { connect } from 'react-redux'
import EditProduct from '../components/EditProduct'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchProduct: (product) => dispatch(fetchProduct(product))
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        product: state.products.product,
        state
    };
};

class EditProductContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputName: '',
            inputImage: '',
            inputSock: '',
            inputPrice: '',
            inputVisible: '',
            descriptionInput: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.props.fetchProduct(id)
            .then(data => data.product)
            .then(data => this.setState({

                inputName: data.name,
                inputImage: data.imgURL,
                inputSock: data.stock,
                inputPrice: data.price,
                inputVisible: data.visible,
                descriptionInput: data.description
            })
            )

    }

    handleChange(e) {

        console.log('ESTOS SON LOS INPUTS', { [e.target.name]: e.target.value })
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.createProduct({
            name: this.state.inputName,
            price: Number(this.state.inputPrice),
            description: this.state.descriptionInput,
            stock: Number(this.state.inputSock),
            imgURL: this.state.inputImage,
            visible: this.state.inputVisible
        })



    }

    render() {
        console.log('ESTAS SON LAS PROPSSSSSS', this.props)
        return (
            <EditProduct
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                state={this.state}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProductContainer)
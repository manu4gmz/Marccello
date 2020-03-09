import React from 'react'
import NewProduct from '../components/NewProduct'
import { createProduct } from '../store/actions/products'
import { connect } from 'react-redux'


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createProduct: (product) => dispatch(createProduct(product)),
    }
}

class NewProductContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputName: '',
            inputImage: '',
            inputSock: '',
            inputPrice: '',
            inputVisible: 'false' ? false : true,
            descriptionInput: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
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

        return (
            <NewProduct
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}

export default connect(null, mapDispatchToProps)(NewProductContainer)





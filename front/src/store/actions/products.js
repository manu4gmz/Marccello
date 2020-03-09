import { SET_PRODUCTS, SET_PRODUCT, SET_PAGE, CREATE_PRODUCT } from '../constants'
import axios from 'axios';

const setProducts = (products) => ({
    type: SET_PRODUCTS,
    products
})

const setProduct = (product) => ({
    type: SET_PRODUCT,
    product
})

export const setPage = (index) => ({
    type: SET_PAGE,
    index
})

export const newProduct = (product) => ({
    type: CREATE_PRODUCT,
    product
})

export const fetchProduct = (productid) => dispatch =>
    axios.get(`/api/products/${productid}`)
        .then(data => data.data)
        .then(product => dispatch(setProduct(product)))

export const fetchProducts = (products, index) => dispatch => {
    if (products) {
        axios.get(`/api/products?s=${products}`)
            .then(data => data.data)
            .then(products => dispatch(setProducts(products)))
            .then(() => dispatch(setPage(index || 0)))
    }
    else {

        axios.get(`/api/products`)
            .then(data => data.data)
            .then(products => dispatch(setProducts(products)))
            .then(() => dispatch(setPage(index || 0)))
    }
}


export const fetchCatProduct = (id, query) => (dispatch) => {

    if (query) {
        axios.get(`/api/category/${id}?s=${query}`)
        .then(data => data.data)
        .then((data) => {dispatch(setProducts(data))})
        .then(()=> dispatch(setPage(0)))

    }
    else {

        axios.get(`/api/category/${id}`)
        .then(data => data.data)
        .then((data) => {dispatch(setProducts(data))})
        .then(()=> dispatch(setPage(0)))

    }
}


export const createProduct = (product) => dispatch =>
    axios.post(`/api/admin/create-product`, product)
        .then(data => data.data)
        .then(product => dispatch(newProduct(product)))



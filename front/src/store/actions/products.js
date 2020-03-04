import {SET_PRODUCTS, SET_PRODUCT} from '../constants'
import axios from 'axios';

const setProducts = (products) => ({
    type: SET_PRODUCTS,
    products
})

const setProduct = (product) => ({
    type: SET_PRODUCT,
    product
})

export const fetchProducts = () => dispatch =>
    axios.get(`/api/products`)
    .then(data => data.data
    )
    .then(products => dispatch(setProducts(products)))

export const fetchProduct = (product) => dispatch =>
    axios.post(`/api/products/?title=${product}`)
    .then(data => data.data
    )
    .then(product => dispatch(setProduct(product)))
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

export const fetchProduct = (productid) => dispatch =>
    axios.get(`/api/products/${productid}`)
    .then(data => data.data)
    .then(product => dispatch(setProduct(product)))

export const fetchProducts = (products) => dispatch =>
    {if (products === undefined) {
        axios.get(`/api/products`)
        .then(data => data.data)
        .then(products => dispatch(setProducts(products)))
    } else {
        axios.get(`/api/products?s=${products}`)
        .then(data => data.data)
        .then(products => dispatch(setProducts(products)))
     }}
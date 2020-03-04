import {SET_PRODUCTS, SET_PRODUCT} from '../constants'
import axios from 'axios';

const setProducts = (products) => ({
    type: SET_PRODUCTS,
    products
})

export const fetchProducts = (products) => dispatch =>
    {if (products === undefined) {
        axios.get(`/api/products`)
        .then(data => data.data)
        .then(products => dispatch(setProducts(products)))
    } else {
        axios.get(`/api/products?s=${product}`)
        .then(data => data.data
        )
        .then(product => dispatch(setProducts(product)))
    }}
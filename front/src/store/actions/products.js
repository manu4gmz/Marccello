import {SET_PRODUCTS} from '../constants'
import axios from 'axios';

const setProducts = (products) => ({
    type: SET_PRODUCTS,
    products
})

export const fetchProducts = () => dispatch =>
    axios.get(`/api/products`)
    .then(data => data.data
    )
    .then(products => dispatch(setProducts(products)))
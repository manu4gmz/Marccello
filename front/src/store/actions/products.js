import {FIND_PRODUCTS} from '../constants'
import axios from 'axios';

const findProducts = (products) => ({
    type: FIND_PRODUCTS,
    products
})

export const fetchProducts = () => dispatch =>
    axios.get(`/api/products`)
    .then(data => data.data
    )
    .then(products => dispatch(findProducts(products)))
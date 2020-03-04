import {SET_PRODUCTS, SET_PRODUCT} from '../constants'

const initialState = {
    products: [],
    product: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return Object.assign({}, state, {products: action.products})
        case SET_PRODUCT:
            return Object.assign({}, state, {product: action.product})
        default:
            return state;
    }
}
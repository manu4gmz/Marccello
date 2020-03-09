import {SET_PRODUCTS, SET_PRODUCT, SET_PAGE} from '../constants'

const initialState = {
    products: [],
    product: {},
    page: [],

}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return Object.assign({}, state, {products: action.products })
        case SET_PRODUCT:
            return Object.assign({}, state, {product: action.product})
        case SET_PAGE:
            return Object.assign({}, state, {page: state.products[action.index] || []})
        default:
            return state;
    }
}
import {FIND_PRODUCTS} from '../store/constants'

const initialState = {
    products: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCTS:
            return Object.assign({}, state, {products: action.products})
        default:
            return state;
    }
}
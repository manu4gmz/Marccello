import { SET_ORDERS, SET_ORDER } from '../constants'

const initialState = {
    orders: [],
    order: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return Object.assign({}, state, {orders: action.orders })
        case SET_ORDER:
            return Object.assign({}, state, {order: action.order})
        default:
            return state;
    }
}
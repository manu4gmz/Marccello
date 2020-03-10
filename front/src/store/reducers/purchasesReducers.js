import {SET_PURCHASES} from '../constants'

const initialState = {
    purchases: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PURCHASES:
            return Object.assign({}, state, {purchases: action.purchases})
        default:
            return state;
    }
}
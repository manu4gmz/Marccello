import {SET_USER} from '../constants'

const initialState = {
    user: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return Object.assign({}, state, {user: action.user})
        default:
            return state;
    }
}
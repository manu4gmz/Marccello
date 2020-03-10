import {SET_REVIEWS, CREATE_REVIEW} from '../constants'

const initialState = {
    reviews: [],
    review: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_REVIEWS:
            return Object.assign({}, state, {reviews: action.reviews})
        case CREATE_REVIEW:
            return Object.assign({}, state, {review: action.review})
        default:
            return state;
    }
}
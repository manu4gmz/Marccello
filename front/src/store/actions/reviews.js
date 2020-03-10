import {SET_REVIEWS, CREATE_REVIEW} from '../constants'
import axios from 'axios';

const setReviews = (reviews) => ({
    type: SET_REVIEWS,
    reviews
})
const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

export const fetchReviews = (producto) => dispatch =>
    axios.get(`/api/products/${producto}/reviews`)
    .then(data => data.data)
    .then(reviews => dispatch(setReviews(reviews)))

export const newReview = (review, producto) => dispatch =>
    axios.post(`/api/products/${producto}`, review)
    .then(data => data.data)
    .then(review => dispatch(createReview(review)))
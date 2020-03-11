import { SET_NOTIF, ADDED_TO_CART } from '../constants'
import axios from 'axios';

const setNotif = (message) => ({
    type: SET_NOTIF,
    message
})

const addedToCart = (product) => ({
    type: ADDED_TO_CART,
    messageProduct: product
})

export const setNotification = (message, time = 2000) => dispatch => {
    dispatch(setNotif(message))
    setTimeout(()=> dispatch(setNotif(null)),time)
}

export const setAddCart = (product, time = 2000) => dispatch => {
    dispatch(addedToCart(product))
    setTimeout(()=> dispatch(addedToCart(null)),time)
}

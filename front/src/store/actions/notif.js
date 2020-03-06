import { SET_NOTIF, ADDED_TO_CART } from '../constants'
import axios from 'axios';

const setNotif = (message) => ({
    type: SET_NOTIF,
    message
})

const addedToCart = (product) => ({
    type: ADDED_TO_CART,
    message: product
})

export const setNotification = (message, product, time = 2000) => dispatch => {
    console.log("\n\n\nEEEEU\n\n\n\n\n\n\n\n",message, product)
    dispatch(product ? addedToCart(product) : setNotif(message))
    setTimeout(()=> dispatch(setNotif(null)),time)
}

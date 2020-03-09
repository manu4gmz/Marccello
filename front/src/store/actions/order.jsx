import { SET_ORDERS, SET_ORDER } from '../constants'
import axios from 'axios';

const setOrders = (orders) => ({
    type: SET_ORDERS,
    orders
})

const setOrder = (order) => ({
    type: SET_ORDER,
    order
})

export const fetchOrder = (orderid) => dispatch => 
    axios.get(`/api/admin/orders/${orderid}`)
    .then(data => data.data)
    .then(order => dispatch(setOrder(order)))

export const fetchOrders = (orders, index) => dispatch =>{
    return axios.get(`/api/admin/orders`)
        .then(data => data.data)
        .then(orders => dispatch(setOrders(orders)))
}

export const sendDrone = (id, coords) => dispatch => {
    axios.post(`/api/admin/orders/${id}/send`, { coords })
        .then(data => console.log(data));
} 
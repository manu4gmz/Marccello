import { SET_PURCHASES } from '../constants'
import axios from 'axios';

const setPurchases = (purchases) => ({
    type: SET_PURCHASES,
    purchases
})

export const fetchPurchases = () => dispatch => {
    axios.get(`/api/purchase`)
    .then(data => data.data)
    .then(purchases => dispatch(setPurchases(purchases)))
}
import {CREATE_USER} from '../constants'
import axios from 'axios';

export const createUser = (user) => dispatch =>
        axios.post(`/api/users/register`, user)
        .then(data => data.data)
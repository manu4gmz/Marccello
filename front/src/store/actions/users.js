import {SET_USER, SET_USERS} from '../constants'
import axios from 'axios';
import { fetchCart } from "./cart";

const setUser = (user) => ({
        type: SET_USER,
        user
})

const setUsers = (users) => ({
        type: SET_USERS,
        users
})
export const getLoggedUser = (user) => dispatch =>
        axios.get(`/api/users/checkLogUser`)
        .then(rta => rta.data)
        .then(data => {
          dispatch(setUser(data.user || {}))
          dispatch(fetchCart())
        })

export const createUser = (user) => dispatch =>
        axios.post(`/api/users/register`, user)
        .then(data => data.data)
        .then(user => dispatch(setUser(user)))

export const fetchUsers = () => dispatch =>
        axios.get(`/api/users`)
        .then(data => data.data)
        .then(users => dispatch(setUsers(users)))

export const promoteUser = (id) => dispatch =>
        axios.get(`/api/users/promote/${id}`)
        .then(data => data.data)

export const demoteUser = (id) => dispatch =>
        axios.get(`/api/users/demote/${id}`)
        .then(data => data.data)
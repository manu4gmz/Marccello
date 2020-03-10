import {SET_USER, SET_USERS} from '../constants'
import axios from 'axios';

const setUser = (user) => ({
        type: SET_USER,
        user
})

const setUsers = (users) => ({
        type: SET_USERS,
        users
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
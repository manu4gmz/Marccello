import { combineReducers } from 'redux';
import productReducer from './productReducer';
import userReducer from './userReducer';
import loginReducer from './loginReducer';

export default combineReducers({
    products: productReducer,
    register: userReducer,
    login: loginReducer,
})
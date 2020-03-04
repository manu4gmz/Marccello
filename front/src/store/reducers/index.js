import { combineReducers } from 'redux';
import productReducer from './productReducer';
import loginReducer from './loginReducer';

export default combineReducers({
    products: productReducer,
    login: loginReducer,
});
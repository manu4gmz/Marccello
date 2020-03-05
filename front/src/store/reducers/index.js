import { combineReducers } from "redux";
import productReducer from "./productReducer";
import loginReducer from "./loginReducer";
import cartReducer from "./cartReducer";
import userReducer from './userReducer';

export default combineReducers({
  products: productReducer,
  login: loginReducer,
  cart: cartReducer,
  user: userReducer,
});

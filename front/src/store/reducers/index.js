import { combineReducers } from "redux";
import productReducer from "./productReducer";
import loginReducer from "./loginReducer";
import cartReducer from "./cartReducer";
import userReducer from './userReducer';
import notifReducer from './notifReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  products: productReducer,
  login: loginReducer,
  cart: cartReducer,
  user: userReducer,
  notif: notifReducer,
  order: orderReducer,
});

import { combineReducers } from "redux";
import productReducer from "./productReducer";
import loginReducer from "./loginReducer";
import cartReducer from "./cartReducer";
import userReducer from './userReducer';
import reviewsReducers from "./reviewsReducers";
import notifReducer from './notifReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  products: productReducer,
  login: loginReducer,
  cart: cartReducer,
  user: userReducer,
  reviews: reviewsReducers,
  notif: notifReducer,
  order: orderReducer,
});

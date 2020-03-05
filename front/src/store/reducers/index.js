import { combineReducers } from "redux";
import productReducer from "./productReducer";
import loginReducer from "./loginReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  products: productReducer,
  login: loginReducer,
  cart: cartReducer
});

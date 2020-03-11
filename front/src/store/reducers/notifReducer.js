import { SET_NOTIF, ADDED_TO_CART } from "../constants";
import React from "react";
import { Link} from "react-router-dom"

const initialState = {
    message: "",
    messageProduct: "",
    cart: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADDED_TO_CART:
  return Object.assign({}, state, { messageProduct: action.messageProduct, cart: true });
    case SET_NOTIF:
      return Object.assign({}, state, { message: action.message });
    default:
      return state;
  }
};

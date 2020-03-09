import axios from "axios";

export const purchaseCart = (address) => dispatch => {
  return axios.post("/api/purchase", {address})
} 

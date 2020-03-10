import axios from "axios";

export const purchaseCart = (address) => dispatch => {
  return axios.post("/api/purchase", {address})
} 

export const getDroneCoords = id => dispatch => {
	return axios.get(`/api/purchase/${id}/status`)
}
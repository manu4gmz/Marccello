import axios from "axios";

export const purchaseCart = (address) => dispatch => {
  return axios.post("/api/purchase", {address})
} 

export const getDroneCoords = id => dispatch => {
	return axios.get(`/api/purchase/${id}/status`)
      .then(rta => rta.data)
}

export const resolvePurchase = id => dispatch => {
	return axios.get(`/api/purchase/${id}/resolve`)
      .then(rta => rta.data)
}

export const getPurchase = id => dispatch => {
	return axios.get(`/api/purchase/${id}`)
      .then(rta => rta.data)
}
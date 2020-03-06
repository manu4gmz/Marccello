import axios from "axios";

const setCart = products => ({
  type: "SET_CART",
  products
});

export const fetchCart = _ => dispatch => {
  axios
    .get(`/api/cart`)
    .then(data => data.data)
    .then(products => dispatch(setCart(products)))
    .catch(err => console.log("El usuario no esta logueado!"));
};

export const incrementOrder = (productId, num) => dispatch => {
  axios
    .put(`/api/cart/${productId}`, { amount: num })
    .then(data => data.data)
    .then(() => dispatch(fetchCart()));
};

export const addToCart = productId => dispatch => {
  axios
    .post(`/api/cart/${productId}`)
    .then(data => data.data)
    .then(() => dispatch(fetchCart()));
};

export const removeFromCart = productId => dispatch => {
  axios
    .delete(`/api/cart/${productId}`)
    .then(data => data.data)
    .then(() => dispatch(fetchCart()));
};

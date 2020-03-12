import axios from "axios";
import { setNotification } from "./notif"; 
import bluebird from "bluebird";

const setCart = products => ({
  type: "SET_CART",
  products
});

const setFeatured = products => ({
  type: "SET_FEATURED_IN_CART",
  products
})

export const fetchCart = user => (dispatch, getState) => {
  if (getState().user.user.id) {
    return axios
      .get(`/api/cart`)
      .then(data => data.data)
      .then(products => dispatch(setCart(products)))
      .catch(err => console.log("El usuario no esta logueado!"));
  }
  else {
    //return;
    if (!window.localStorage.getItem("cart")) return dispatch(setCart([]))
    const cart = window.localStorage.getItem("cart").split(",").map(item => item.split(":"));
    bluebird.all(
      cart.map(item => 
        axios.get(`/api/products/${item[0]}`)
          .then(rta => rta.data)
          .then(product => ({
            ...product,
            order: {
              amount: item[1]
            }
          }))
      )
    ).then(products => {
      dispatch(setCart(products))
    })
  }
};

export const incrementOrder = (productId, num) => (dispatch, getState) => {
  if (getState().user.user.id) {
    axios
      .put(`/api/cart/${productId}`, { amount: num })
      .then(data => data.data)
      .then(({exceded}) => {
        dispatch(fetchCart())
        exceded && dispatch(setNotification("Esa cantidad no esta disponible"))
      });
  } else {
    const cart = window.localStorage.getItem("cart").split(",");
    const maped = cart.map(a => {
      const [ id, amount, stock ] = a.split(":");
      if (Number(amount)+num < 1) return a;
      if (Number(amount)+num > stock) {
        dispatch(setNotification("Esa cantidad no esta disponible"));
        return a;
      }
      return id == productId ? id+":"+(Number(amount)+Number(num))+":"+stock : a;
      
    })
    window.localStorage.setItem("cart", maped);
    dispatch(fetchCart())
  }
};

const addToLoggedCart = productId => dispatch => {
  axios
    .post(`/api/cart/${productId}`)
    .then(data => data.data)
    .then(() => dispatch(fetchCart()));
};

const addToLocalCart = productId => dispatch => {
  const cart = window.localStorage.getItem("cart");
  if (cart) {
    console.log("\n\n\n----------------- ")
    console.log(cart, productId)
    console.log(cart.split(","))
    console.log(cart.split(",").map(a => Number(a.split(":")[0])))
    console.log("\n\n\n")
  }

  if (cart && cart.split(",").map(a => Number(a.split(":")[0])).includes(Number(productId))) {
    return dispatch(setNotification("Ese producto ya se encuentra en tu carrito"))
  }


  axios.get(`/api/products/${productId}`)
  .then(rta => rta.data)
  .then(product => {
    window.localStorage.setItem("cart", `${cart ? `${cart},` : ""}${product.id}:1:${product.stock}`);
  })
};

export const removeFromCart = productId => (dispatch, getState) => {
  if (getState().user.user.id) {
    axios
      .delete(`/api/cart/${productId}`)
      .then(data => data.data)
      .then(() => dispatch(fetchCart()));
  } else {
    const cart = window.localStorage.getItem("cart").split(",");
    const filtered = cart.filter(a => a[0] != productId);
    if (filtered.length) window.localStorage.setItem("cart", filtered.join(","))
    else window.localStorage.clear(); 
    dispatch(fetchCart())
  }
};

export const addToCart = (productId) => (dispatch, getState) => {
  if (getState().user.user.id) dispatch(addToLoggedCart(productId))
    else dispatch(addToLocalCart(productId))
}

export const moveLocalToLogged = () => dispatch => {
  if (!window.localStorage.getItem("cart")) return;
  const cart = window.localStorage.getItem("cart");
  return axios.post("/api/cart/log", { cart })
    .then((data)=>{
      console.log(data)
      window.localStorage.clear()
    })
}

export const fetchFeatured = () => dispatch => {
  return axios.get("/api/products?o=hr")
    .then(rta => rta.data)
    .then(products => dispatch(setFeatured(products[0].slice(0,4))));
}
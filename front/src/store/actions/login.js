import Axios from "axios";

const userLogin = (user) => ({
  type: "USER_LOGIN",
  user
});

const userLogout = () => ({
  type: "USER_LOGOUT",
});

export const login = (user) => (dispatch) => {
  return   Axios.post("api/users/login", user)
  .then(data => data.data)
  .then((data) => {
    dispatch(userLogin(data))
  }).catch(err=>console.log(err))
}
  
export const logout = () => {
  return function (dispatch, getstate) {
    Axios.post("api/users/logout")
      .then(res => {
        dispatch(userLogout())
      })
  }
}
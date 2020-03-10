import Axios from "axios";
import { USER_LOGIN, USER_LOGOUT } from "../constants";

const userLogin = (user) => ({
  type: USER_LOGIN,
  user
});

const userLogout = () => ({
  type: USER_LOGOUT,
});

let afterLogin = null;

export const goLogin = (history, success) => dispatch => {
  history.push("/login");
  afterLogin = success;

} 


export const login = (user) => (dispatch) => {
  return Axios.post("api/users/login", user)
  .then(data => data.data)
  .then((data) => {
    dispatch(userLogin(data));
    if (afterLogin) afterLogin();
    else return true;
  })
  .catch(error => { throw new Error(error) } )
}
  
export const logout = () => {
  return function (dispatch, getstate) {
    return Axios.post("api/users/logout")
      .then(res => {
        dispatch(userLogout())
      })
  }
}
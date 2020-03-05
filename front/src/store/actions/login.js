import Axios from "axios";

const userLogin = (email, password) => ({
  type: "USER_LOGIN",
  email: email, 
  password: password,
});

const userLogout = () => ({
  type: "USER_LOGOUT",
});

export const login= (email, password) =>{
    return function(dispatch, getstate){
        console.log(email)
        console.log(password)
        Axios.post("api/users/login", {email: email, password: password})
        .then (res =>{ dispatch(userLogin(email, password))})
    }
}

export const logout = () => {
  return function(dispatch, getstate){
      Axios.post("api/users/logout")
      .then (res =>{ dispatch(userLogout())})
  }
}
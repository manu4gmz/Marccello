const initialState = {
    email : null,
    password : null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case "USER_LOGIN":
		  return Object.assign({}, state, {
            email: action.email,
            password: action.password
		  })
		  case "USER_LOGOUT":
			return Object.assign({}, state, {
			  username: "",
			  password: ""
		})
		default:
			return state
	}
};
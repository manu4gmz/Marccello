const initialState = {
  products: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_CART":
      return Object.assign({}, state, { products: action.products });
    default:
      return state;
  }
};

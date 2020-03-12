const initialState = {
  products: [],
  featured: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_CART":
      return Object.assign({}, state, { products: action.products });
    case "SET_FEATURED_IN_CART":
      return Object.assign({}, state, { featured: action.products });
    default:
      return state;
  }
};

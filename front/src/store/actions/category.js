import axios from "axios";
import {SET_CATEGORIES} from '../constants'

const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  categories
});

export const fetchCategories = () => (dispatch) => {
  axios.get("/api/category")
  .then(data => data.data)
  .then((data) => {dispatch(setCategories(data))
  })
}
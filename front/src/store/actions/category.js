import axios from "axios";
import {SET_CATEGORIES} from '../constants'
import {fetchProduct} from './products'

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

export const linkCategory = (id, category) => (dispatch) => {
  return axios.post(`/api/category/${id}`, {
      name: category
    })
    .then(data => data.data)
  .then(data => dispatch(fetchProduct(id)) )


}

export const deleteCategoryProduct = (id, category) => (dispatch) => {
  console.log(category);
  console.log(id);
  
  return axios.delete(`/api/category/delete/${id}/${category}`, {
    name: category
  })
  .then(data => data.data)
  .then(data => dispatch(fetchProduct(id)) 
  )
}
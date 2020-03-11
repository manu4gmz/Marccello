import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchCategories, linkCategory, deleteCategoryProduct } from '../store/actions/category'
import { fetchProduct } from '../store/actions/products'

import { Image } from 'react-bootstrap'
class CategoriesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleDelete = this.handleDelete.bind(this)
    this.handleLink = this.handleLink.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchProduct(this.props.match.params.id)
    
  }

  handleLink(category) {
    this.props.linkCategory(this.props.match.params.id, category)
  }

  handleDelete(category) {
    this.props.deleteCategoryProduct(this.props.match.params.id, category)
  }

  handleSubmit(e) {
    e.preventDefault()
    const category = e.target[0].value
    this.props.linkCategory(this.props.match.params.id, category)
    .then(() =>this.props.fetchCategories())
  }


  render() {
      const {categories, product} = this.props
      console.log(categories);
      console.log(product)
      console.log(this.state);
      const cats=(product.categories || []).map(cat=> cat.id)
            
      return (
        <div>
          <ul>
            {categories.map( category => {
              return (
                <li key = {category.id}>{category.name}
                {cats.includes(category.id) ?
                  <Image
                    style={{ width: "20px", display: "inline", cursor: "pointer" }}
                    src="/assets/bin.svg"
                    onClick={()=>{this.handleDelete(category.name)}}
                  />
                :
                <Image
                  style={{ width: "20px", display: "inline", cursor: "pointer" }}
                  src="/assets/more.svg"
                  onClick={()=>{this.handleLink(category.name)}}
                />
                }
                </li>
            )
            })}
            <form onSubmit = {this.handleSubmit}>
              <input></input>
              <button type="submit">Add category</button>
            </form>
          </ul>
        </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    categories: state.category.categories,
    product: state.products.product
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    linkCategory: (id, category) => dispatch(linkCategory(id, category)),
    deleteCategoryProduct: (id, category) => dispatch(deleteCategoryProduct(id, category)),
    fetchProduct: (id) => dispatch(fetchProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);

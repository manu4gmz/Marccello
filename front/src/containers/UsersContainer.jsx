import React, { useReducer, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from '../store/actions/users'
import  User  from '../components/User'
import {promoteUser} from '../store/actions/users'

class UsersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
   this.props.fetchUsersProp()
  }

  handleClick (e) {
    console.log(e.target.value);
    const id = e.target.value
    this.props.promoteUser(id)
    .then(() => this.props.fetchUsersProp())
  }

    render() {
      return (
        <>
          {this.props.users? this.props.users.map(user => {
            return (
              <Fragment key = {user.id}>
              <User user = {user} handleClick = {this.handleClick}/>
              </Fragment>
            )
          }): ''}
        </>
    )
    }
    
}

const mapStateToProps = function(state, ownProps) {
    return {
        users: state.user.users
      };
};

const mapDispatchToProps = function(dispatch, ownProps){
   return { 
     fetchUsersProp: () => dispatch(fetchUsers()),
     promoteUser: (id) => dispatch(promoteUser(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

import React, { useReducer, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../store/actions/users";
import User from "../components/User";
import { promoteUser, demoteUser } from "../store/actions/users";
import Header from "../components/Header";

class UsersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handlePromClick = this.handlePromClick.bind(this);
    this.handleDemClick = this.handleDemClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsersProp();
  }

  handlePromClick(e) {
    const id = e.target.value;
    this.props.promoteUser(id).then(() => this.props.fetchUsersProp());
  }

  handleDemClick(e) {
    const id = e.target.value;
    this.props.demoteUser(id).then(() => this.props.fetchUsersProp());
  }

  render() {
    return (
      <Fragment>
        <br />
        <Header>Usuarios</Header>
        {this.props.users
          ? this.props.users.map(user => {
              return (
                <Fragment key={user.id}>
                  <User
                    user={user}
                    handlePromClick={this.handlePromClick}
                    handleDemClick={this.handleDemClick}
                  />
                </Fragment>
              );
            })
          : ""}
      </Fragment>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    users: state.user.users
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    fetchUsersProp: () => dispatch(fetchUsers()),
    promoteUser: id => dispatch(promoteUser(id)),
    demoteUser: id => dispatch(demoteUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

import React from "react";
import { connect } from "react-redux";
import Login from '../components/Login'
import { withRouter } from 'react-router-dom'

const mapStateToProps = function (state) {
    return {
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
    };
};

class LoginContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputEmail: '',
            inputPassword: '',
            error: false

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {

    }
    handleChange(evt) {
        const value = evt.target.value;
        this.setState({ [evt.target.name]: value })
    }
    handleSubmit(e) {
        e.preventDefault();

    }

    render() {
        return <Login error={this.state.error} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />;
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));
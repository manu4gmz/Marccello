import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import Register from '../components/Register'

const mapStateToProps = function (state) {
    return {
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
    };
};

class RegisterContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputUsername: '',
            inputEmail: '',
            inputPassword: '',
            inputAddress: ''
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
        axios.post('/api/users/register', {
            username: this.state.inputUsername,
            password: this.state.inputPassword,
            email: this.state.inputEmail,
            address: this.state.inputAddress

        })
            .then(res => res.data)
            .then(() => console.log('se creo el usuario'))
            .catch(console.log('no se creo'))

    }

    render() {
        return <Register handleSubmit={this.handleSubmit} handleChange={this.handleChange} />;
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterContainer));
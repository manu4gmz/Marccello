import React from "react";
import Button from '../components/Button.jsx';
import Header from "../components/Header";
import { Container, Form, Row, Col } from "react-bootstrap";
import {login} from '../store/actions/login'
import {connect} from "react-redux";
import Input from "../components/Input.jsx";
import { fetchCart } from "../store/actions/cart";
import { setNotification } from "../store/actions/notif";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.username && this.state.password) {

            let obj = {
                username: this.state.username,
                password: this.state.password
            }
            this.props.login(obj)
            .then(()=> {
                this.setState({error: false})
             })
            .then(() => {
                this.props.fetchCart();
            this.props.setNotification(<div>Bienvenido <strong>{obj.username}</strong>!</div>)
                this.props.history.push('/')
            })
            .catch(() => this.setState({error: true}))
        }
    }
    render() {
        const alertStyle = {
            borderRadius: "30px",
            marginTop: "17px"
        }

    return (
        <Container className="mt-2 mb-5">
            <Header>Iniciá sesión</Header>
            <Col md={6} className="mx-auto">
                <p>Iniciá sesión; estás a un click de cambiar tu vida, o al menos tu paladar. </p>
                <hr/>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Group>
                        <label>Username</label>
                        <Input onChange={this.handleChange} name='username' type="text" placeholder="elmas@capito.org" value={this.state.username} />
                    </Form.Group>
                    <Form.Group>
                        <label>Contraseña</label>
                        <Input onChange={this.handleChange} name='password' type="password" placeholder="prefierousasnunjucks" value={this.state.password}/>
                        {this.state.error?(<div className="alert alert-danger" style={alertStyle} role="alert">El nombre de usuario o contraseña es incorrecto</div>) : (null)}
                    </Form.Group>
                    <Button type="submit" buttonTxt={'Iniciar sesión'} />
                </Form>
            </Col>
        </Container>
    )
    }
}
const mapStateToProps = (state, ownProps)=> {
    return {
      user: state.user
    }
  }
  
const mapDispatchToProps = (dispatch, ownProps) => {
return {
    login: (user)=> (dispatch(login(user))),
    logout: ()=>dispatch(logout()),
    fetchCart: () => dispatch(fetchCart()),
    setNotification: (message) => dispatch(setNotification(message))
}
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
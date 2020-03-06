import React, { Component, Fragment } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  Container,
  FormControl,
  Dropdown,
  Alert
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Icon from "../components/Icon";
import {connect} from "react-redux";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <Icon src="/assets/user.svg" />
  </a>
));

class MainNavbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const {message, addedCart, user} = this.props
    return (
      <Navbar bg="light" expand="lg" style={{padding: "10px 0"}}>
        <Container>
          <Link to="/">
            <img
              style={{ width: "120px" }}
              src="/assets/logo/marccello-logo.svg"
            />
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
            {message? 
              (
                addedCart ?
                <div  className="navbarAlert">Se agrego un {message} al carrito. <br/><Link to="/carrito">Ver carrito</Link></div>
                :
                <div className="navbarAlert">
                {message}
              </div>)
              :
              null
              }

            <Form inline className="ml-auto">
              <Link to="/productos" className="mr-3 text-muted">Productos</Link>
              <Input placeholder="Search" search={true} className="mr-sm-2" />
              <Link to="carrito"><Icon src="/assets/supermarket.svg" /></Link>

                
            <Dropdown alignRight>
              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"/>

              <Dropdown.Menu>
                {user.username?
                <Fragment>
                  <Dropdown.Item>{user.username}</Dropdown.Item>
                  <Dropdown.Item><Link to="/">Compras</Link></Dropdown.Item>
                  {user.type === "admin"?<Dropdown.Item><Link to="/">Admin</Link></Dropdown.Item>:null}
                  <Dropdown.Divider></Dropdown.Divider> 
                  <Dropdown.Item><Link to="/">Log out</Link></Dropdown.Item> 
                </Fragment>
                :
                <Fragment>
                  <Dropdown.Item><Link to="/login">Inicia sesión</Link></Dropdown.Item>
                  <Dropdown.Item><Link to="/register">Registrate</Link></Dropdown.Item>
                </Fragment>} 
                
              </Dropdown.Menu>
            </Dropdown>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (state, ownProps)=> {
  console.log(state)
  
  return {
    message: state.notif.message,
    addedCart: state.notif.cart,
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar)
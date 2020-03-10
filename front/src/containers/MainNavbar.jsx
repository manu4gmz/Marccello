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
import { connect } from "react-redux";
import { logout } from "../store/actions/login";
import { setNotification } from "../store/actions/notif";
import { getLoggedUser } from "../store/actions/users";

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
    this.state = {};
    this.ClickLogout = this.ClickLogout.bind(this);
  }

  ClickLogout() {
    this.props.logout().then(() => {
      this.props.setNotification(<div>Logout exitoso!</div>);
    });
  }

  componentDidMount() {
    this.props.getLoggedUser();
  }

  render() {
    const { message, addedCart, user, logout } = this.props;
    return (
      <Navbar bg="light" expand="lg" style={{ padding: "10px 0" }}>
        <Container>
          <Link to="/">
            <img
              style={{ width: "135px", padding: "3% 0" }}
              src="/assets/logo/marccello-logo.svg"
            />
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {message ? (
              addedCart ? (
                <div className="navbarAlert">
                  Se agregó un {message} al carrito. <br />
                  <Link to="/carrito">Ver carrito</Link>
                </div>
              ) : (
                  <div className="navbarAlert">{message}</div>
                )
            ) : null}

            <Form inline className="ml-auto">
              <Link to="/productos" className="mr-3 text-muted">
                Productos
              </Link>
              <Input placeholder="Search" search={true} className="mr-sm-2" />
              <Link to="/carrito">
                <Icon src="/assets/supermarket.svg" />
              </Link>

              <Dropdown alignRight>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                />

                <Dropdown.Menu>
                  {user.username ? (
                    <Fragment>
                      <Dropdown.Item>{user.username}</Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/purchases">Compras</Link>
                      </Dropdown.Item>
                      <Dropdown.Divider></Dropdown.Divider>
                      {user.type !== 'normal' ? (
                        <Dropdown.Item>

                          <Link to="/admin/orders">
                            Admin
                        </Link>
                        </Dropdown.Item>
                      ) : null}
                      <Dropdown.Item>
                        <Link onClick={this.ClickLogout} to="/">
                          Log out
                        </Link>
                      </Dropdown.Item>

                    </Fragment>
                  ) : (
                      <Fragment>
                        <Dropdown.Item>
                          <Link to="/login">Inicia sesión</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to="/register">Registrate</Link>
                        </Dropdown.Item>
                      </Fragment>
                    )}
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);

  return {
    message: state.notif.message,
    addedCart: state.notif.cart,
    user: state.user.user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(logout()),
    setNotification: message => dispatch(setNotification(message)),
    getLoggedUser: () => dispatch(getLoggedUser())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);

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
import { Link, withRouter } from "react-router-dom";
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
    console.log("CLICKLOGOUT");

    this.props.logout().then(() => {
      this.props.setNotification("Logout exitoso!");
    });
  }

  componentDidMount() {
    this.props.getLoggedUser();
  }

  render() {
    const { message, addedCart, user, logout, messageProduct } = this.props;
    return (
      <Navbar
        bg="light"
        expand="lg"
        style={{ padding: "13px 0", boxShadow: "0px -4px 12px #00000045" }}
      >
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
                  {message} <br />
                </div>
              ) : (
                <div className="navbarAlert">{message}</div>
              )
            ) : null}
            {messageProduct ? (
              addedCart ? (
                <div className="navbarAlert">
                  Se agregó un {messageProduct} al carrito. <br />
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
                      <Dropdown.Item
                        onClick={() => this.props.history.push(`/purchases`)}
                      >
                        Compras
                      </Dropdown.Item>
                      <Dropdown.Divider></Dropdown.Divider>
                      {user.type !== "normal" ? (
                        <Dropdown.Item
                          onClick={() =>
                            this.props.history.push(`/admin/orders`)
                          }
                        >
                          Admin
                        </Dropdown.Item>
                      ) : null}
                      {/* <Dropdown.Item>
                        <Link onClick={this.ClickLogout} to="/">
                          Log out
                        </Link>
                      </Dropdown.Item> */}
                      <Dropdown.Item
                        onClick={() => {
                          this.ClickLogout();
                          this.props.history.push(`/`);
                        }}
                      >
                        Log out
                      </Dropdown.Item>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Dropdown.Item
                        onClick={() => this.props.history.push(`/login`)}
                      >
                        Inicia sesión
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => this.props.history.push(`/register`)}
                      >
                        Registrate
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
  return {
    message: state.notif.message,
    messageProduct: state.notif.messageProduct,
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
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainNavbar)
);

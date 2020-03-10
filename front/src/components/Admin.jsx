import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import Orders from "../containers/Orders";
import SingleOrder from "../containers/SingleOrder";
import NewProductContainer from "../containers/NewProductContainer";
import AdminProductListContainer from "../containers/AdminProductListContainer";
import EditProductContainer from "../containers/EditProductContainer";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";

const Admin = ({ match, user }) => {
  return (
    <Fragment>
      {
        user.type === "normal" ? <Redirect to="/" /> : null
      }
      <Row>
        <Col md="2">
          <Sidebar />
        </Col>
        <Col md="10">
          <Container>

            <Switch>
              <Route path={match.path + "/create-product"} exact component={NewProductContainer} />
              <Route path={match.path + "/edit-product/:id"} component={EditProductContainer} />
              <Route path={match.path + "/edit-product"} exact component={AdminProductListContainer} />
              <Route path={match.path + "/orders/:id"} exact component={SingleOrder} />
              <Route path={match.path + "/orders"} exact component={Orders} />
              <Redirect path={match.path} exact to="/admin/orders" />
            </Switch>
          </Container>
        </Col>

      </Row>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user
})

export default connect(mapStateToProps, null)(Admin)
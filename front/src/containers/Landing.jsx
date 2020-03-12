import React, { Component, Fragment } from "react";
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Card,
  CardDeck,
  Image,
  Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Button1 from "../components/Button.jsx";
import Header from "../components/Header";
import "./Landing.css";
import ProductModule from "../components/ProductModule";
import { connect } from "react-redux";
import { fetchFeatured } from "../store/actions/cart";


class Landing extends Component {
  componentDidMount() {
    this.props.fetchFeatured();
  }

  render() {
    return (
      <Fragment>
        <Jumbotron fluid className="mainHero" style={{ 
          backgroundImage: `url("/assets/ice-cream-with-berries-PA9XYSLslide.jpg")`,
          paddingTop: "200px",
          paddingBottom:" 220px",
          marginBottom: "0px"
        }}>
          <Container>
            <Col md="6" className="px-0">
              <h1>
                Probalo <br />y conoccello
              </h1>
            </Col>
            <br />
            <Link to="/productos">
              <Button1 buttonTxt={"Quiero pedir"} />
            </Link>
            {/* <p>Agachate y conocelo</p> */}
          </Container>
        </Jumbotron>
        <div style={{
          backgroundColor: "#e2d5da",
          color: "#6b4856",
          padding: "5% 0 4%",
        }}>
          <h1 className="text-center mb-4" style={{ fontWeight: "700"}}>¡Pedí tu helado favorito y te llega en dron!</h1>
        </div>
        <Container>

          <div style={{ paddingTop: "4%" }}>
            <Header>Los más elegidos</Header>
          </div>
          <Row style={{ paddingBottom: "4%" }}>
            {
              this.props.featured.map((product,i)=>
                <ProductModule product={product} index={i} onClick={()=>{
                  this.props.history.push(`/producto/${product.id}`);
                }}/>
                )
            }
          </Row>
          <div style={{ paddingTop: "4%" }}>
            <Header>Cómo comprar</Header>
          </div>
          <Row className="text-center" style={{ marginTop: "6%" }}>
            <Col md="4" className="px-5">
              <Image
                className="mb-4"
                fluid="true"
                variant="top"
                src="assets/ComoComprar-03.png"
              />
              <h3 className="comprarTxt">Elegí</h3>
            </Col>
            <Col md="4" className="px-5">
              <Image
                className="mb-4"
                fluid="true"
                variant="top"
                src="assets/ComoComprar-04.png"
              />
              <h3 className="comprarTxt">Pagá</h3>
            </Col>
            <Col md="4" className="px-5">
              <Image
                className="mb-4"
                fluid="true"
                variant="top"
                src="assets/ComoComprar-05.png"
              />
              <h3 className="comprarTxt">Recibí</h3>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    featured: state.cart.featured
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    fetchFeatured: () => dispatch(fetchFeatured())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
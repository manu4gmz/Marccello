import React, { Component } from "react";
import Button from "../components/Button";
import { Jumbotron, Row, Col, Container, Image, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Input from "../components/Input.jsx";
import { connect } from "react-redux";
import { fetchProduct } from "../store/actions/products";
import { setNotification, setAddCart } from "../store/actions/notif";
import { fetchReviews, newReview } from "../store/actions/reviews";
import { fetchPurchases } from "../store/actions/purchases";
import { addToCart } from "../store/actions/cart";
import ReactStars from "react-stars";

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ratingChanged = this.ratingChanged.bind(this);

    this.state = {
      title: "",
      content: "",
      rating: ""
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  ratingChanged(newRating) {
    this.setState({ rating: newRating });
  }
  handleSubmit(e) {
    e.preventDefault();
    let obj = {
      title: this.state.title,
      content: this.state.content,
      rating: this.state.rating
    };
    this.props
      .newReview(obj, this.props.match.params.id)
      .then(() => {
        if (obj.rating > 2) {
          this.props.setNotification("¡Muchas gracias por tu reseña!");
        } else {
          this.props.setNotification("Gracias eh...");
        }
      })
      .then(() => this.props.fetchReviews(this.props.match.params.id));
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchProduct(id);
    this.props.fetchReviews(id);
    this.props.fetchPurchases();
  }

  render() {
    const hero = {
      backgroundColor: "#E2D5DA",
      heigth: "100px"
    };
    const wrapper = {
      backgroundColor: "#ffffff",
      heigth: "430px",
      boxShadow: "3px 3px 5px #00000035",
      padding: "45px"
    };
    const info = {
      marginTop: "38%",
      position: "relative",
      right: "20%"
    };
    const { product, reviews, user, purchases } = this.props;

    return (
      <div>
        <Container
          fluid
          className="px-0"
          style={{ maxHeight: "100vh", overflow: "hidden" }}
        >
          <Row className="m-0 p-0" style={hero}>
            <Col md="8" className="px-0">
              <Image
                src={product.imgURL}
                style={{ width: "100%", display: "inline" }}
                fluid
              />
              <div
                style={{
                  width: "30px",
                  position: "absolute",
                  left: "0px",
                  display: "inline",
                  marginLeft: "16%",
                  marginTop: "3%"
                }}
              >
                <Link to="/productos/1">
                  <img src="/assets/back.svg" />
                </Link>
              </div>
            </Col>
            <Col md="3" className="px-0">
              <div style={info}>
                <Container style={wrapper}>
                  <h2
                    style={{
                      color: "#707070",
                      fontSize: "30px",
                      fontWeight: "600",
                      paddingBottom: "14px"
                    }}
                  >
                    {product.name}
                  </h2>
                  <p
                    style={{
                      color: "#707070",
                      fontSize: "15px"
                      //   paddingBottom: "4px"
                    }}
                  >
                    {product.description}
                  </p>
                  <p
                    style={{
                      color: "#707070",
                      fontSize: "20px",
                      fontWeight: "600"
                    }}
                  >
                    ${product.price}
                  </p>
                </Container>
                <div
                  style={{
                    marginTop: "25px",
                    marginLeft: "auto",
                    display: "inline",
                    float: "right"
                  }}
                >
                  <Button
                    buttonTxt={"Agregar"}
                    buttonClass={"buttonDark"}
                    onClick={() => {
                      this.props.addToCart(product.id);
                      this.props.setAddCart(product.name);
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <br />
          <br />

          <Header>Comentarios</Header>
          {user.username &&
          !reviews.map(review => review.userId).includes(user.id) &&
          purchases
            .map(purchase => purchase.products.map(producto => producto.id))
            .flat(1)
            .includes(product.id) ? (
            <div>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <label>Título</label>
                  <Input
                    onChange={this.handleChange}
                    name="title"
                    placeholder="Título de la reseña"
                    value={this.state.title}
                    type="text"
                  />
                </Form.Group>
                <Form.Group>
                  <label>Rating</label>
                  <ReactStars
                    name="rating"
                    value={this.state.rating}
                    count={5}
                    onChange={this.ratingChanged}
                    size={24}
                    color2={"#ffd700"}
                  />
                </Form.Group>
                <Form.Group>
                  <label>Comentario</label>
                  <Input
                    onChange={this.handleChange}
                    name="content"
                    type="content"
                    placeholder="Dejanos tu comentario"
                    value={this.state.content}
                    type="text"
                  />
                </Form.Group>

                <Button buttonTxt={"Confirmar"} />
              </Form>
            </div>
          ) : user.username ? (
            reviews.map(review => review.userId).includes(user.id) ? (
              "Gracias por tu reseña!"
            ) : (
              "Tenés que comprar el producto para dejar tu reseña!"
            )
          ) : (
            <p>
              <i>Iniciá sesión para dejar una reseña!</i>
            </p>
          )}
          <br />
          <br />

          {reviews.length > 0 ? (
            reviews.map(review => {
              return (
                <div key={review.id}>
                  <Row>
                    <Col md="3">
                      <p
                        style={{
                          display: "inline-block",
                          fontSize: "18px",
                          fontWeight: "600",
                          display: "inline-block"
                        }}
                      >
                        {review.title}
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          display: "inline-block",
                          paddingLeft: "5%"
                        }}
                      >
                        <i>{review.user}</i>
                      </p>
                    </Col>
                    <Col md="3">
                      <Image
                        style={{
                          width: "15px",
                          display: "inline",
                          marginTop: "-2%"
                        }}
                        src="/assets/Fstar.svg"
                      />
                      <p style={{ paddingLeft: "3%", display: "inline-block" }}>
                        {" "}
                        {review.rating}
                      </p>
                    </Col>
                  </Row>
                  <p
                    style={{
                      fontSize: "15px"
                    }}
                  >
                    {review.content}
                  </p>

                  <div style={{ padding: "2% 0" }}>
                    {" "}
                    <Col md="4">
                      <hr />
                    </Col>
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ fontWeight: "600" }}>No hay comentarios todavía</p>
          )}
        </Container>
        <div style={{ padding: "3%" }}></div>
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  console.log(state);

  return {
    product: state.products.product,
    reviews: state.reviews.reviews,
    user: state.login.user,
    purchases: state.purchases.purchases
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    addToCart: productId => dispatch(addToCart(productId)),
    fetchProduct: id => dispatch(fetchProduct(id)),
    fetchReviews: id => dispatch(fetchReviews(id)),
    newReview: (review, producto) => dispatch(newReview(review, producto)),
    setNotification: msg => dispatch(setNotification(msg)),
    setAddCart: prod => dispatch(setAddCart(prod)),
    fetchPurchases: () => dispatch(fetchPurchases())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

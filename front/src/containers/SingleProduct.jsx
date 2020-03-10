import React, { Component } from "react";
import Button from "../components/Button";
import { Jumbotron, Row, Col, Container, Image, Form } from "react-bootstrap";
import Header from "../components/Header";
import Input from "../components/Input.jsx";
import { connect } from "react-redux";
import { fetchProduct } from "../store/actions/products";
import {setNotification} from "../store/actions/notif";
import {fetchReviews, newReview} from "../store/actions/reviews";


class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
        title: "",
        content: "",
        rating: "",
    }
  }
  handleChange(e) {
    this.setState({[e.target.name]:e.target.value})
  }
  handleSubmit(e) {
      e.preventDefault();
      let obj = {
          title: this.state.title,
          content: this.state.content,
          rating: this.state.rating,
      }
      this.props.newReview(obj, this.props.match.params.id)
      .then(() => {this.props.fetchReviews(this.props.match.params.id);
        if(obj.rating>2){
          this.props.setNotification(<div>¡Muchas gracias por tu reseña!</div>)
        } else {
          this.props.setNotification(<div>Gracias eh...</div>)
        }
      }) 
  }

  componentDidMount() {
    const id = this.props.match.params.id    
    this.props.fetchProduct(id)
    this.props.fetchReviews(id)
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
    const {product, reviews, user} = this.props
        
    return (
      <div>
        <Container fluid className="px-0" style={{ maxHeight: "100vh", overflow:"hidden" }}>
          <Row className="m-0 p-0" style={hero}>
            <Col md="8" className="px-0">
              <Image
                src={
                  product.imgURL
                }
                style={{ width: "100%" }}
                fluid
              />
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
                      //   paddingTop: "15px"
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
                  <Button buttonTxt={"Agregar"} buttonClass={"buttonDark"} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <br />
          <br />

          <Header>Comentarios</Header>
          {
            user.username && !reviews.map(review => review.userId).includes(user.id) ?(
              <div>
                <Form onSubmit={this.handleSubmit} >
                  <Form.Group>
                      <label>Título</label>
                      <Input onChange={this.handleChange} name='title' placeholder="Título de la reseña" value={this.state.title}  type="text"/>
                  </Form.Group>
                  <Form.Group>
                      <label>Rating</label>
                      <Input onChange={this.handleChange} name='rating' type="text" value={this.state.rating}/>
                  </Form.Group>
                  <Form.Group>
                      <label>Contenido</label>
                      <Input onChange={this.handleChange} name='content' type="content" placeholder="Contenido" value={this.state.content} type="text"/>
                  </Form.Group>
                  
                  <Button buttonTxt={'Dejar comentario'} />
                </Form>
              </div>
            ) : ( user.username ? 
              ("Gracias por tu reseña!") :
              ("Tenés que estar loggeado para dejar una reseña.")
              )
          }
          <br />
          <br />
          {
            reviews.length>0 ? (reviews.map(review => {
              return (
                <div key={review.id}>  
                  <h4>{review.title}</h4>
                  <p> {review.rating}</p>
                  <p>{review.content}</p>
                </div>)
            }
            )) : ("No hay comentarios todavía")
          }
        </Container>
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
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    fetchProduct: id => dispatch(fetchProduct(id)),
    fetchReviews: id => dispatch(fetchReviews(id)),
    newReview: (review, producto) => dispatch(newReview(review, producto)),
    setNotification: (msg, pr) => dispatch(setNotification(msg, pr))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

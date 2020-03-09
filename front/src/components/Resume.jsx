import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button1 from "../components/Button";

export default ({cart, handleBuy}) => {
	const round = (num) => (Math.floor(num*100))/100;
    
	const totalCount =
      round(
        cart.length
          ? cart.map(p => p.order.amount).reduce((acc, c) => acc + c)
          : 0
      );
    const totalPrice =
      round(
        cart.length
          ? cart.map(p => p.price * p.order.amount).reduce((acc, c) => acc + c)
          : 0
      );

	return (
		<Container className="conta">
	        <h4 className="tit">RESUMEN</h4>
	        <hr />
	        <div className="txt">
	          <p className="txt">
	            {totalCount} producto{totalCount > 1 ? "s" : ""}
	          </p>
	          <hr />
	          <Row>
	            <Col md="7">
	              <p>Total de productos</p>
	            </Col>
	            <Col md="5">
	              <p className="txt2">${round(totalPrice)}</p>
	            </Col>
	          </Row>
	          <Row>
	            <Col md="7">
	              <p>Envío</p>
	            </Col>
	            <Col md="5">
	              <p className="txt2">$200 </p>
	            </Col>
	          </Row>
	          <Row>
	            <Col md="7">
	              <b>
	                <p>Total</p>
	              </b>
	            </Col>
	            <Col md="5">
	              <b>
	                <p className="txt2">${round(totalPrice + 200)}</p>
	              </b>
	            </Col>
	          </Row>
	        </div>
	        {
	        	handleBuy ?
		        <div style={{ margin: "3% 30%", padding: "8% 0" }}>
		          <Button1 buttonTxt={"Comprar"} onClick={handleBuy}/>
		        </div> : null
	        }
	      </Container>
	)
}
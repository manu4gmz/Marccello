import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom"
export default () => (
    <div style={{ backgroundColor: "#e0dedf", height: "100%", position: "relative", left: "0px", padding: "25px", color: "#6b4856", fontSize: "15px" }}>
        <p style={{ fontWeight: "700" }}>ADMIN</p>
        <Link to="/admin/orders"><p style={{ color: "#6b4856" }}>Órdenes</p></Link>
        <Link to="/admin/create-product"><p style={{ color: "#6b4856" }}>Crear producto</p></Link>
        <Link to="/admin/edit-product"><p style={{ color: "#6b4856" }}>Editar productos</p></Link>
        <Link to="/admin/usuarios"><p style={{ color: "#6b4856" }}>Usuarios</p></Link>
    </div>

)
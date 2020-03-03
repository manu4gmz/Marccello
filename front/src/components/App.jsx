import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "../containers/Landing";
import MainNavbar from "../containers/MainNavbar";
import Footer from "./Footer"
import 'bootstrap/dist/css/bootstrap.min.css';


export default function () {
	return (
		<Fragment>
		<MainNavbar />
		<Switch>
			<Route path="/" component={ Landing } />
		</Switch>
		<Footer/>
		</Fragment>
	)
};
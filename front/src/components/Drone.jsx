import React, { Component } from 'react';
import {Entity, Scene} from 'aframe-react';

export default () => {
	console.log("dou")
	return (
		<div>
		<iframe src={`https://maps.google.com/maps?width=100%&height=600&hl=en&q=Malet%20St%2C%20London%20WC1E%207HU%2C%20United%20Kingdom+(Your%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B`}/>
		</div>
	)
}
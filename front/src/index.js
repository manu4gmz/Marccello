// el inicio de la app
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {Provider} from 'react-redux'; 
//import store from './store/index';
import App from "./components/App";


ReactDOM.render(
        <BrowserRouter>
        	<Route path="/" component={App}/>
        </BrowserRouter>,
    document.getElementById('app')
)

/*
    <Provider store ={ store } >
    </Provider>, 
*/
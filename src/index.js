import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import { } from 'react-router';
import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import { Router, browserHistory ,Route, IndexRoute } from 'react-router';
import App from './components/App';
import {loadProducts} from './actions/productsActions';
import configureStore from './store/configureStore';
import HomePage from './components/home/HomePage';
import ProductsPage from './components/products/ProductsPage';
import ManageProductPage from './components/products/ManageProductPage'; //eslint-disable-line import/no-named-as-default
import LoginPage from './components/account/LoginPage'; //eslint-disable-line import/no-named-as-default
import RegisterPage from './components/account/RegisterPage'; 
import toastr from 'toastr';

//configure store
const store = configureStore();

//Preload products from api
store.dispatch(loadProducts());

//Check loginstatus for routing
//ToDo: implement 0Auth 
function checkLoginStatus(nextState, replaceState) {
  
    const loggedIn = store.getState().account
    if (!loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        toastr.error("You need to be logged in to access products page. Please login first");
        replaceState(null, '/login');
      }
    }
}


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route onEnter={checkLoginStatus}>
          <Route path="/products" component={ProductsPage} />
          <Route path="/product" component={ManageProductPage} />
          <Route path="/product/:Id" component={ManageProductPage} />
        </Route>   
    </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

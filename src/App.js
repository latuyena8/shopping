import React, { Component } from "react";
import logo from '../public/img/7.gif';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home'
import Product from './components/Product/index'
import About from './components/About'
import Cart from './components/Cart'
import Profile from './components/Profile'
import './App.css';
//setup Redux
import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './components/redux/reducers/rootReducer'
import { Provider, connect } from 'react-redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer, composeEnhancers())

export default class App extends Component {
  componentWillMount() {
    axios.get('http://svcy3.myclass.vn/api/Product')
      .then(res => {
        store.dispatch({ type: 'LOAD_DATA', payload: res.data.content })
      })

  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='container-content'>
            <div className='nav-menu'>
              <div className='logo col-sm-4'>
                <img src={logo}></img>
              </div>
              <ul className='col-sm-8'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/product">Product</Link></li>
                <li><Link to="/product">Sale</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/profile">Profile</Link></li>
              </ul>
            </div>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/product">
                <Product />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

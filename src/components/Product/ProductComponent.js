import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux'
import cart from '../../../public/img/cart.png'
class ProductComponent extends Component {
    render() {
        var val = this.props.children
        return (
            <div className="col-sm-3">
                <div className="card">
                    <div className="card-body">
                        <img width='100%' src={val.image}></img>
                        <p className="card-title"><b>{val.name}</b></p>
                        <p className="card-text">{(val.price * 1000).toLocaleString()}VNĐ</p>
                        <button onClick={this.props.addToCart(val)} className="btn btn-primary cart-btnPayment">Add to cart</button>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    cart: state.cart,
});
const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        addToCart: (data) => () => {
            data = {...data, amount:1}
                dispatch({ type: 'ADD_TO_CART', payload: data })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
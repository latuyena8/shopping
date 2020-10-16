import React, { Component } from 'react';
import '../../css/Cart.css'
import { flip } from '@popperjs/core';
class CartComponent extends Component {
    render() {
        let val = this.props.children
        console.log(val)
        return (            
            <div className="col-sm-12">
                <div className="card col-sm-12" style={{ display: "flex", flexDirection: "row", padding: '1%' }}>
                    <div className="col-sm-3">
                        <img width='50%' src={val.image}></img>
                    </div>
                    <div className="col-sm-2" style={{ alignSelf: "center", margin: '0 5%' }}>
                        <p className="card-title"><b>{val.name}</b></p>
                    </div>
                    <div className="col-sm-2" style={{ alignSelf: "center", margin: '0 5%' }}>
                        <p className="card-title"><b>{(val.price*1000).toLocaleString()}</b></p>
                    </div>
                    <div className="col-sm-" style={{ alignSelf: "center" }}>
                        <h5 className="card-amount"><b>{val.amount}</b></h5>
                    </div>
                    <div className="col-sm-2" style={{ alignSelf: "center" }}>
                        <h5 className="card-amount"><b>{(val.amount* val.price*1000).toLocaleString()} VNĐ</b></h5>
                    </div>
                </div>
            </div >
        );
    }
}

export default CartComponent;
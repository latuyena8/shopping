import React, { Component } from 'react';
import { connect } from 'react-redux'
import CartComponent from './CartComponent'
import sad from '../../../public/img/sad2.gif';

// Node v10.15.3
const axios = require('axios').default;
const CryptoJS = require('crypto-js');
import { v1 as uuid } from 'uuid';
const moment = require('moment');


// INFO ZALOPAY
const config = {
    appid: "553",
    key1: "9phuAOYhan4urywHTh0ndEXiV3pKHr5Q",
    key2: "Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3",
    endpointCreateOrderURL: "/v001/tpe/createorder",
    endpointGetOrderStatus: "/v001/tpe/getstatusbyapptransid",

};
var e;

class index extends Component {
    constructor(props) {
        super(props)
        this.componentWillMount.bind(this)
        this.createOrderURL.bind(this)
        e = this
    }
    componentWillMount() {
        this.props.getCart()
    }

    createOrderURL() {
        let price = e.props.cart.reduce((a, b) => a.price * 1000 + b.price * 1000)
        // let quantity = this.props.cart.reduce((pre, next) => pre.amount + next.amount)
        const embeddata = {
            merchantinfo: "embeddata123"
        };
        const items = e.props.cart

        const order = {
            appid: config.appid,
            apptransid: `${moment().format('YYMMDD')}_${uuid()}`,
            appuser: "demo",
            apptime: Date.now(),
            item: JSON.stringify(items),
            embeddata: JSON.stringify(embeddata),
            amount: price,
            description: "ZaloPay Integration Demo by LT",
            bankcode: "",
        };
        sessionStorage.setItem('apptransid', order.apptransid)

        const data = config.appid + "|" + order.apptransid + "|" + order.appuser + "|" + order.amount + "|" + order.apptime + "|" + order.embeddata + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        // ***** 1. Đặt lịch 15 phút sau khi nhấn thanh toán để kiểm tra tình trạng đơn hàng
        let timerId = setInterval(() => {
            console.log('goi', sessionStorage.getItem('apptransid'))
            if (sessionStorage.getItem('apptransid') != null) {
                e.getOrderStatus()
            }
        }, 60000)
        setTimeout(() => { clearInterval(timerId); }, 60000 * 16);
        //******* */

        // ***** 2. Lưu dữ liệu order vào redux và xóa dữ liệu trong cart
        e.props.setOrder(order)
        e.props.restartCart()

        axios.post(config.endpointCreateOrderURL, null, { params: order })
            .then(res => {
                console.log('create order: ', res.data);
                // location.href = res.data.orderurl
                window.open(res.data.orderurl)
            })
            .catch(err => console.log(err));
    }
    getOrderStatus() {
        let params = {
            appid: config.appid,
            apptransid: sessionStorage.getItem('apptransid'),
        };

        let data = config.appid + "|" + params.apptransid + "|" + config.key1; // appid|apptransid|key1
        params.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        axios.get(config.endpointGetOrderStatus, {
            params
        }).then(res => {
            console.log(res.data)
            if (res.data.returncode == 1 || res.data.returncode == 2) {
                sessionStorage.removeItem('apptransid')
                let data = {
                    apptransid: params.apptransid,
                    amount: res.data.amount,
                    discountamount: res.data.discountamount,
                    ccbankcode: res.data.ccbankcode,
                    returncode: res.data.returncode,
                    returnmessage: res.data.returnmessage,
                    zptransid: res.data.zptransid,
                }
                e.props.setOrder(data)
            }
        }).catch(err => console.log(err));

    }
    render() {
        if (this.props.cart == '') {
            return (
                <div className='cart-container'>
                    <h5 className='cart-notify'>Không có sản phẩm nào trong giỏ</h5>
                    <img src={sad}></img>
                </div>
            )
        }
        return (
            <div>
                <div>
                    {this.props.cart.map((item, i) => <CartComponent key={i}>{item}</CartComponent>)}
                </div>
                <div className='col-sm-12'>
                    <button className='col-sm-5' onClick={this.createOrderURL} className="btn btn-primary">Thanh Toán</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    order: state.order,
});
const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        getCart: () => {
            dispatch({ type: 'GET_CART' })
        },
        setOrder: (data) => {
            dispatch({ type: 'ADD_ORDER', payload: data })
        },
        restartCart: () => {
            dispatch({ type: 'RESTART_CART' })
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index);
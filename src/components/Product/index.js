import React, { Component } from 'react';
import axios from 'axios'
import { connect, bindActionCreators } from 'react-redux'
import ProductComponent from './ProductComponent'
class index extends Component {
    render() {
        console.log('store: ', this.props.store)
        if (this.props.store == '') {
            return <p>No</p>
        }
        return (
            <div className="row">
                {this.props.store.map((item, i) => <ProductComponent key={i}>{item}</ProductComponent>)
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    store: state.store,
});
const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        loadData: () => {
            axios.get('http://svcy3.myclass.vn/api/Product')
                .then(res => {
                    dispatch({ type: 'LOAD_DATA', payload: res.data.content })
                })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index);
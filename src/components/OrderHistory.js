/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Shopping-Navbar';
import {AppContext} from './ContextProvider';
import {Link} from 'react-router-dom';
import './orderHistory.css'
export default class OrderHistory extends Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            displayForm: false
        }
    }

    componentDidMount() {
        axios.get('/api/orderHistory').then(res => {
            this.setState({orders: res.data})

        })
    }
    render() {
        console.log(this.state)
        const style = {
            display: this.state.displayForm
        }
        return (
            <AppContext.Consumer>
                {(context) => {
                    return (
                        <div className="order-history-body">
                            <Navbar cart={context.cart}/>
                            {this.state.orders ?
                                <div className="order-history-container">
                                    <h1>{context.user.name}'s Order History</h1>
                                    {this.state.orders.map((order, index) => {
                                        console.log(order)
                                        return (
                                            <div key={index} className="order-container">
                                                <h1>{this.state.orders[index].cart_id}</h1>
                                                <div className="history-order">
                                                {order.map((product, index) => {
                                                    return (
                                                        <div key={index} className="product-container">
                                                            <img src={product.image}/>
                                                            <div className="history-product-info">
                                                                <h5>{product.title}</h5>
                                                                <p>${product.price}</p>
                                                                <Link to={`/api/shopping/${product.category}/${product.id}`}><button>Buy Again</button></Link>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                </div>
                                                <div className="history-action-buttons">
                                                    <button>Review Product</button>
                                                    <Link to={`/api/profile/orderhistory/invoice/${order[0].cart_id}`}><button>Invoice</button></Link>
                                                    <Link to={`/api/refund/${order[0].cart_id}`}><button>Request Refund</button></Link>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                : null}
                        </div>
                    )
                }}
            </AppContext.Consumer>
        );
    }
}
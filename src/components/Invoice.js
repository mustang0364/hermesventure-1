/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Shopping-Navbar';
import {AppContext} from './ContextProvider';
import {Link} from 'react-router-dom';
import './invoice.css'

export default class Invoice extends Component {
    constructor() {
        super();
        this.state = {
            order: [],
        }
    }

    componentDidMount() {
        axios.get(`/api/invoice/${this.props.match.params.id}`).then(res => {
            this.setState({order: res.data})
        })
    }
    render() {
        const { order } = this.state
        console.log(this.state.order)
        return (
            <AppContext.Consumer>
                {(context) => {
                    return (
                        <div>
                            <Navbar cart={context.user}/>
                            <div className="invoice-body">
                                {this.state.order.length > 0 ?
                                <div className="invoice-container">                                
                                    <div className="invoice-shipping-info">
                                        <h1>Order Number:{order[0].cart_id}</h1>
                                        <p>Shipping Address:</p>
                                        <p>{order[0].street}</p>
                                        <p>{order[0].city}</p>
                                        <p>{order[0].state}</p>
                                        <Link to="/api/profile/orderhistory"><button className="backbutton">Back</button></Link>
                                    </div>
                                    {this.state.order.map((order, index) => {
                                        return (
                                            <div className="invoice-order-container" key={index}>
                                                <img src={order.image}/>
                                                <h1>{order.title}</h1>
                                                <p>{order.price}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                : <h1>Loading...</h1>}
                            </div>
                        </div>

                    )
                }}
            </AppContext.Consumer>
        );
    }
}
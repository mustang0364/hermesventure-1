/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Shopping-Navbar';
import {AppContext} from './ContextProvider';
import {Link} from 'react-router-dom';
import './requestRefund.css'

class RequestRefund extends Component {
    constructor() {
        super();
        this.state = {
            order: [],
            orderNumber: null,
            name: null,
            email: null,
            text: null,
        }
    }

    componentDidMount() {
        console.log('hit request refund')
        axios.get(`/api/invoice/${this.props.match.params.id}`).then(res => {
            this.setState({
                order: res.data,
                orderNumber: this.props.match.params.id
            })
        })
    }

    updateInputs(key, userInput) {
        this.setState({
            [key]: userInput
        })
    }

    refundRequest() {
        axios.post('/api/refundRequest', {...this.state})
    }
    render() {
        console.log(this.state)
        return (
            <AppContext.Consumer>
                {(context) => {
                    return (
                        <div>
                            <Navbar cart={context.user}/>
                            <h1 className="refund-header">Refund Form</h1>
                            <div className="refund-body">
                                {this.state.order.length > 0 ?
                                    <div className="refund-container">   
                                    <Link to="/api/profile/orderhistory"><button className="backbutton">Back</button></Link>                             
                                        {this.state.order.map((order, index) => {
                                            return (
                                                <div className="refund-order-container" key={index}>
                                                    <img src={order.image}/>
                                                    <h1>{order.title}</h1>
                                                    <p>{order.price}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                : <h1>Loading...</h1>}
                                <div className="form-container">
                                    <h3>Order Number: {this.state.orderNumber}</h3>
                                    <input placeholder="Name" onChange={(e) => this.updateInputs('name', e.target.value)}/>
                                    <input placeholder="Email"onChange={(e) => this.updateInputs('email', e.target.value)}/>
                                    <textarea placeholder="What do you want refunded?"onChange={(e) => this.updateInputs('text', e.target.value)}/>
                                    <button className='refund-submit' onClick={() => this.refundRequest()}>Submit</button>
                                </div>
                            </div>
                        </div>

                    )
                }}
            </AppContext.Consumer>
        );
    }
}

export default RequestRefund
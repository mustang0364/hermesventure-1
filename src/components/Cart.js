/* eslint-disable */
import React, { Component } from 'react';
import {AppContext} from './ContextProvider';
import './cart.css'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import Navbar from './Shopping-Navbar';

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            addresses: [],
            shipToAddress: [],
            orderNumber: [],
            streetInput: '',
            cityInput: '',
            zipInput: '',
            stateInput: '',
        }
    }
    componentDidMount() {
        axios.get('/api/getUser').then(res => {
            if(res.data !== 'Not Authorized') {
                axios.get(`/api/getaddress/${res.data.id}`).then(response => {
                    this.setState({
                        user: res.data,
                        addresses: response.data
                    })
                })
            } else {
                this.props.history.push('/api/login')
            }
        })
    }

    shiptoAddress(id, street) {
        this.setState({
            shipToAddress: [id, street]
        })
    }

    handleInputs(key, userInput) {
        this.setState({
            [key]: userInput
        })
    }
    addAddress = () => {
        axios.post('/api/createaddress', {...this.state}).then( res => {
            axios.get('/api/getUser').then(res => {
                if(res.data !== 'Not Authorized') {
                    axios.get(`/api/getaddress/${res.data.id}`).then(response => {
                        this.setState({
                            user: res.data,
                            addresses: response.data
                        })
                    })
                } else {
                    this.props.history.push('/api/login')
                }
            })
        })
     }


    render() {
        console.log(this.state)
        return (
            this.state.user ? 
                <AppContext.Consumer>
                    {(context) => {
                        if(context.cart.length > 0) {
                        let price = context.cart.map((item) => (item.price) * item.quantity).reduce((a,b) => a + b)
                        let taxes = Math.round(price * .062)
                        let grandTotal = (price + taxes)
                        
                        return (
                            <div className="cart-container">
                                <Navbar cart={context.cart}/>
                                <div className="cart">
                                <h1>Your Cart</h1>
                                    {context.cart.map((item) => {
                                        return (
                                            <div key={item.id} className="cart-item-container">
                                                <h2 id="item-title">{item.title}</h2>
                                                <img src={item.image}/>
                                                <p id="item-price">${item.price}</p>
                                                <p id="item-quantity">{item.quantity}</p>
                                                <p onClick={() => context.methods.deleteFromCart(item.id)}><i className="far fa-trash-alt"></i></p>
                                                <input type="number" type="tel" placeholder="Update Quantity?" onChange={(e) => context.methods.handleQuantity(e.target.value)}/>
                                                <p><i className="fas fa-check" onClick={() => context.methods.updateQuantity(item)}></i></p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="checkout-container">
                                    <div className="address-container">
                                    {this.state.addresses.length > 0 ?
                                        <div>
                                            <h2>Please Select an Address</h2>
                                            {this.state.addresses.map((address, index) => {
                                                return (
                                                    <div key={index}>
                                                    <p>{address.street}, {address.city} <button className="select-button" onClick={() => this.shiptoAddress(address.addressid, address.street)}>Select</button></p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        : <div>
                                            <h2>Please Add an Address</h2>
                                            <input onChange={(e) => this.handleInputs('streetInput', e.target.value)} placeholder='Enter Street'/>
                                            <input onChange={(e) => this.handleInputs('cityInput', e.target.value)} placeholder='Enter City'/>
                                            <input onChange={(e) => this.handleInputs('stateInput', e.target.value)} placeholder='Enter State EX: AZ' maxLength="2"/>
                                            <input onChange={(e) => this.handleInputs('zipInput', e.target.value)} placeholder='Enter Zip'/>
                                            <button onClick={() => this.addAddress()}>Add This Address</button>
                                        </div>}
                                    {this.state.shipToAddress ?
                                        <h4>Ship To Address: {this.state.shipToAddress[1]}</h4>
                                    : null}
                                    </div>
                                    <h1>Subtotal ${price}</h1>
                                    <h1>Taxes ${taxes}</h1>
                                    <h1>Total ${grandTotal}</h1>
                                    {this.state.shipToAddress.length > 0 ?
                                    <Checkout 
                                            name="Hermes Venture"
                                            amount={grandTotal}
                                            cart={context.cart}
                                            orderNumber={context.orderNumber}
                                            address={this.state.shipToAddress[0]}
                                            forward={this.props.history.push}
                                            emptyCart={context.methods.successfulPurchaseEmptyCart}
                                    />
                                    : null}
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div >
                                <Navbar cart={context.cart}/>
                                <h1 className="cart-empty-h1">Oh no! Your Cart is Empty!</h1>
                            </div>
                        )
                    }
                    }}
                </AppContext.Consumer>
            : null
        );
    }
}

const Checkout = props => {
    const STRIPE_PUBLISHABLE = 'pk_test_Jh4PfCKnHVRs1AvfG0w5KEwL';
    const PAYMENT_SERVER_URL = '/charge';
    let orderInfo = [props.orderNumber, props.cart, props.address];
    const CURRENCY = "USD";
    const fromUSDToCent = amount => amount * 100;

    const successPayment = data => {
        axios.post('/api/createOrder', orderInfo).then( () => {
            props.emptyCart();
            sessionStorage.clear();
            props.forward('/api/shopping')
        }
            
        )
        console.log('Payment Successful')
    }
    const errorPayment = data => {
        console.log('Payment Error', data)
    }

    const onToken = amount => token =>
    axios.post(PAYMENT_SERVER_URL,
        {
            source: token.id,
            currency: CURRENCY,
            amount: fromUSDToCent(amount)
        }
    ).then(successPayment).catch(errorPayment);
    
    const Checkout = ({name, description, amount}) => 
    <StripeCheckout
        name={name}
        description={description}
        amount={fromUSDToCent(amount)}
        token={onToken(amount)}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
    />
    return (
        <div id="stripe-button">
            <Checkout
                name="Hermes Venture"
                amount={props.amount}
            />
        </div>
    )

}

export default Cart
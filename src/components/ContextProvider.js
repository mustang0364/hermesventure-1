/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';

export const AppContext = React.createContext();

export default class ContextProvider extends Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            quantity: 1,
            orderNumber: null,
            userAddresses: [],
            shipToState: null,
            user: null,
            methods: {
                addToCart: (item) => {
                    let newObj = {
                        id: item.id,
                        title: item.title,
                        category: item.category,
                        price: item.price,
                        image: item.image,
                        description: item.description,
                        quantity: this.state.quantity || 1
                    }
                    for(let i = 0; i < this.state.cart.length; i++) {
                        if(this.state.cart[i].id == newObj.id) {
                            return console.log('Already Exists')
                        }
                    }
                    this.setState((prevState) => ({cart: prevState.cart.concat(newObj)}))
                },
                createOrderNumber: (id) => {
                    axios.post(`/api/orderNumber/${id}`).then(res => {
                        console.log('order number', res.data[0].id)
                        this.setState({orderNumber: res.data[0].id})
                    })
                },
                handleQuantity: (value) => {
                    // if(value > 0) {
                        this.setState({quantity: value})
                    // } else {
                    //     alert('Quantity must be greater than zero')
                    //     this.setState({quantity: 1})
                    // }
                },
                updateQuantity: (item) => {
                    console.log('item',item)
                    if(+this.state.quantity > 0 && +this.state.quantity < 5) {
                        let updateObj = {
                            id: item.id,
                            title: item.title,
                            category: item.category,
                            price: item.price,
                            image: item.image,
                            description: item.description,
                            quantity: +this.state.quantity
                        }
                        console.log('hit update', item.id)
                        let tempCart = [...this.state.cart]
                        for(let i = 0; i < tempCart.length; i++) {
                            if(tempCart[i].id === item.id) {
                                tempCart.splice(i,1)
                                tempCart.push(updateObj)
                                this.setState({cart: tempCart})
                            }
                        }
                    } else if(+this.state.quantity >= 5) {
                        alert('If you wish to purchase more than 4, please contact us via email')
                    } else {
                        alert('Quantity must be greater than zero')
                    }
                },
                handleShipToAddress: (state) => {
                    this.setState({shipToState: state})
                },
                successfulPurchaseEmptyCart: () => {
                    console.log('empty cart function hit')
                    this.setState({cart: []})
                },
                deleteFromCart: (id) => {
                    console.log(id)
                    let newCart = this.state.cart.filter((item) => {
                        return item.id !== id
                    })
                    this.setState({cart: newCart})
                }
            }

        }
    }

    componentDidMount() {
        const cart = JSON.parse(sessionStorage.getItem('cart'))
        if(cart) {
            this.setState({cart})
        }
        axios.get('/api/getUser').then(res => {
            if(res.data !== 'Not Authorized') {
                this.setState({
                    user: res.data
                })
            }
        })
    }

    componentDidUpdate(prevState) {
        if(this.state.cart.length > 0) {
            if(prevState.cart !== this.state.cart) {
                const cart = JSON.stringify(this.state.cart)
                sessionStorage.setItem('cart', cart)
            }
        }
    }
    render() {
        console.log(this.state.quantity)
        return  <AppContext.Provider value={this.state}>
                    {this.props.children}
                </AppContext.Provider>
    }
}


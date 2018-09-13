import React, { Component } from 'react';
import Navbar from './Shopping-Navbar';
import './shopping-item.css'
import axios from 'axios';
import {Link} from 'react-router-dom';
import {AppContext} from './ContextProvider';
class Item extends Component {
    constructor() {
        super();
        this.state = {
            product: null,
            related: null,
        }
    }

    componentDidMount() {
        axios.get(`/api/shopping/${this.props.match.params.category}/${this.props.match.params.id}`).then(res => {
            this.setState({product: res.data[1], related: res.data[0]})
        })
        
    }

    replace(category, id) {
        axios.get(`/api/shopping/${category}/${id}`).then(res => {
            this.setState({product: res.data[1], related: res.data[0]})
        })
        window.scroll(0,0)
    }

 
    render() {
        const { product, related } = this.state
        return (
            <div className="single-item-body">
                <AppContext.Consumer>
                    {(context) => {
                        return (
                            <div>
                                <Navbar cart={context.cart}/>
                                {this.state.product ?
                                    <div className="single-item-container">
                                        <div className="single-item-info-container">
                                            <div className="single-item-img">
                                                <img src={product.image} alt="product"/>
                                            </div>
                                            <div className="single-item-info">
                                                <h1>{product.title}</h1>
                                                <h2>${product.price}</h2>
                                                <h4>Free Shipping</h4>
                                                <h3>Quantity <input type="number/tel" onChange={(e) => context.methods.handleQuantity(e.target.value)} value={context.quantity}/></h3>
                                                <p><button onClick={() => context.methods.addToCart(product)}>Add To Cart</button></p>
                                                {context.user ? 
                                                <Link to="/api/shopping/cart">
                                                    <p><button onClick={() => context.methods.createOrderNumber(context.user.id)}>Checkout</button></p>
                                                </Link>
                                                :<Link to="/api/login">
                                                <p><button>Checkout</button></p>
                                            </Link>}
                                             </div>
                                        </div>
                                        <div className="single-item-description">
                                            <h1>{product.title}</h1>
                                            <p>{product.description}</p>
                                        </div>
                                        <div className="related-container">
                                        <h2 className="related-header">Related Products</h2>
                                            {related ?
                                                <div  className="related-img-container">
                                                
                                                    {related.map((item) => {
                                                        return (
                                                            <div key={item.id} className="img-container">
                                                                <img src={item.image} alt="shopping-item" onClick={() => this.replace(item.category, item.id)}/>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            : null}
                                        </div>
                                    </div>
                                : null}
                            </div>
                        )
                    }}
                </AppContext.Consumer>
            </div>
        );
    }
}

export default Item
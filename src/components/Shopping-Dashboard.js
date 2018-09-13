/* eslint-disable */
import React, { Component } from 'react';
import {AppContext} from './ContextProvider';
import {Link} from 'react-router-dom';
import Navbar from './Shopping-Navbar';
import axios from 'axios';
import './shopping-dashboard.css';






class Shopping extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            peru: 'none',
            tibet: 'none',
            maldives: 'none',
        }
    }

    componentDidMount() {
        axios.get('/api/dashboard/all').then(res => {
            this.setState({products: res.data})
        })
    }
    getAllProducts() {
        axios.get('/api/dashboard').then(res => {
            this.setState({products: res.data})
        })
    }

    showOrHide(country) {
        switch(country) {
            case "peru":
                this.setState({peru: 'block'})
                switch(this.state.peru) {
                    case 'block':
                        this.setState({peru: 'none'})
                        break;
                }
                break;
            case "tibet":
            this.setState({tibet: 'block'})
                switch(this.state.tibet) {
                    case 'block':
                        this.setState({tibet: 'none'})
                        break;
                }
                break;
            case "maldives":
            this.setState({maldives: 'block'})
                switch(this.state.maldives) {
                    case 'block':
                        this.setState({maldives: 'none'})
                        break;
                }
                break;
            default: return country 
        }
    }

    sort(country, gender) {
        axios.get(`/api/sort/products/${country}/${gender}`).then(res => {
            this.setState({products: res.data})
        })
    }
    sortCountry(country) {
        axios.get(`/api/sort/products/${country}`).then(res => {
            this.setState({products: res.data})
        })
    }


    
    render() {
        const styleP = {
            display: this.state.peru,
        }
        const styleT = {
            display: this.state.tibet,
        }
        const styleM = {
            display: this.state.maldives,
        }
        return (
            <div>
                <AppContext.Consumer>
                    {(context) => {
                        return (
                       
                            <div>
                               
                                <Navbar cart={context.cart}/>
                                <div className="shopping-container">
                                    <div className="top-image">
                                        <div className="content-container">
                                            <div className="left-nav-pane">
                                                <ul>
                                                    <li className="peru-header" onClick={() => this.showOrHide('peru')}>Peru</li>
                                                        <div className="peru-list" style={styleP}>
                                                            <li onClick={() => this.sort('Peru', 'mens')}>Mens</li>
                                                            <li onClick={() => this.sort('Peru', 'womens')}>Womens</li>
                                                            <li onClick={() => this.sortCountry('Peru')}>All</li>
                                                        </div>
                                                    <li className="maldives-header" onClick={() => this.showOrHide('maldives')}>Maldives</li>
                                                    <div className="maldives-list" style={styleM}>
                                                            <li onClick={() => this.sort('Maldives', 'mens')}>Mens</li>
                                                            <li onClick={() => this.sort('Maldives', 'womens')}>Womens</li>
                                                            <li onClick={() => this.sortCountry('Maldives')}>All</li>
                                                        </div>
                                                    <li className="tibet-header" onClick={() => this.showOrHide('tibet')}>Tibet</li>
                                                    <div className="tibet-list" style={styleT}>
                                                            <li onClick={() => this.sort('Tibet', 'mens')}>Mens</li>
                                                            <li onClick={() => this.sort('Tibet', 'womens')}>Womens</li>
                                                            <li onClick={() => this.sortCountry('Tibet')}>All</li>
                                                        </div>
                                                    <li className="get-all" onClick={() => this.getAllProducts()}>All</li>
                                                </ul>
                                            </div>
                                            <div className="products-container">
                                                {this.state.products ?
                                                    <div className="products">
                                                        {this.state.products.map((product) => {
                                                            return (
                                                                <Link to={`/api/shopping/${product.category}/${product.id}`} key={product.id}><div className="product-info" >
                                                                    <img src={product.image}/>
                                                                    <h4>{product.title}</h4>
                                                                    <p>${product.price}</p>
                                                                </div></Link>
                                                            )
                                                        })}
                                                    </div>
                                                : <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>}
                                             
                                            
                                             
                                                
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                </AppContext.Consumer>
            </div>
        
        );
    }
}
export default Shopping
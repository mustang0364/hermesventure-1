import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import SingleItem from './components/Shopping-Item';
import Cart from './components/Cart';
import Shopping from './components/Shopping-Dashboard';
import Profile from './components/Profile';
import Login from './components/Login';
import OrderHistory from './components/OrderHistory';
import Invoice from './components/Invoice';
import RequestRefund from './components/RequestRefund';


class Routes extends Component {
    render() {
        console.log('hello routes')
        return (
            <Switch>
                <Route path="/api/shopping" exact component={Shopping} />
                <Route path="/api/shopping/:category/:id" component={SingleItem} />
                <Route path="/api/shopping/cart" component={Cart}/>
                <Route path="/api/profile" exact component={Profile} />
                <Route path="/api/profile/orderhistory" exact component={OrderHistory}/>
                <Route path="/api/profile/orderhistory/invoice/:id" component={Invoice}/>
                <Route path="/api/refund/:id" component={RequestRefund}/>
                <Route path="/api/login" component={Login}/>
            </Switch>
        );
    }
}

export default Routes
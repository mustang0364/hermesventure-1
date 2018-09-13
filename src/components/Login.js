import React, { Component } from 'react';
import Navbar from './Shopping-Navbar'
import {AppContext} from './ContextProvider';
import './login.css'

export default class Login extends Component {
    render() {
        const auth0 = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&response_type=code&scope=openid%20profile%20email&redirect_uri=${encodeURIComponent(`${window.location.origin}/auth/callback`)}`
        return (
            <AppContext.Consumer>
                {(context) => {
                    return (
                        <div className="login-container">
                            <Navbar cart={context.cart}/>
                            <div className="login-items">
                                <h1>Please Login To View Profile</h1>
                                <a href={auth0}>Login</a>
                            </div>
                        </div>
                    )
                }}
            </AppContext.Consumer>
        );
    }
}
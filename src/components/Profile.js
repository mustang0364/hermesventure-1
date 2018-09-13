/* eslint-disable */
import React, { Component } from 'react';
import ShoppingNavbar from './Shopping-Navbar';
import axios from 'axios';
import {AppContext} from './ContextProvider';
import {Link} from 'react-router-dom';
import './profile.css';
import deleteIcon from '../Media/Images/delete.png';

class Profile extends Component {
    constructor(){
        super();

        this.state = {
            user: null,
            showMessage: false,
            message: "Your Address has been saved Succesfully",
            userAddress: '',
            streetInput: '',
            cityInput: '',
            zipInput: '',
            stateInput: '',
        }
    }
    
componentDidMount() {
    axios.get('/api/getUser').then(res => {
        if(res.data !== 'Not Authorized') {
            this.setState({user: res.data})
            this.getAddress();
        } else {
            this.props.history.push('/api/login')
        }
    })   
}

  getAddress = () => {
    setTimeout(() => {
        axios.get(`/api/getaddress/${this.state.user.id}`).then(res => {
            this.setState({
                userAddress: res.data,
            })
        }) 
    }, 500)
  }

   handleInput = (key, input) => {
       this.setState({
           [key]: input
       })
   }
   addAddress = () => {
       axios.post('/api/createaddress', {...this.state}).then( res => {
            this.setState({
                userAddress: res.data,
            })
       })
       this.setState({showMessage: true})
       setTimeout(() => {
           this.getAddress();
       }, 500);
    }
   updateAddress = () => {
       axios.post('/api/createaddress', {...this.state}).then( res => {
            this.setState({
                userAddress: res.data,
            })
       })
       setTimeout(() => {
        this.getAddress();
    }, 500);
}
    removeAddress = (id, addressid) => {
        axios.delete(`/api/removeaddress/${id}/${addressid}`);
        this.getAddress();
    }
   updateAddressShown = () => {
       this.setState({
           userAddress: '',
           messageShown: false,
       })
    }

    render(){
        return (
                this.state.user ? 
            <AppContext.Consumer>
                {(context) => {         
                    return (
                        <div className="profilemain">
                            <ShoppingNavbar cart={context.cart}/>
                        <div className="blurbgcont">
                        <div className="blurbg"></div>
                        </div>
                                <div className="userinfo">
                                <div className="userinfocontainer">
                                <h1 className='h1alt'>Welcome</h1>
                                <div className="profileheader">
                                    <h1 className='h1prof'>{this.state.user.name}</h1>
                                    <h1 className='h1prof'>{this.state.user.email}</h1> 
                                </div>
                                {this.state.userAddress == ''
                                ? <div className="needsmoreinfo">
                                    <h1 className='h1alt'>Please add an address to your profile</h1>
                                    <div><input onChange={(e) => this.handleInput('streetInput', e.target.value)} placeholder='Enter Street'/></div>
                                    <div><input onChange={(e) => this.handleInput('cityInput', e.target.value)} placeholder='Enter City'/></div>
                                    <div><input onChange={(e) => this.handleInput('stateInput', e.target.value)} placeholder='Enter State ex: AZ' maxLength="2"/></div>
                                    <div><input onChange={(e) => this.handleInput('zipInput', e.target.value)} placeholder='Enter Zip'/></div>
                                    <div><button className='profilebutton' onClick={() => this.addAddress()}>Add This Address</button></div>
                                </div>
                                : this.state.userAddress === '' && this.state.showMessage 
                                ? <div className='addresses'><h1 className='h1alt'>{this.state.message}</h1>
                                {this.state.userAddress ? this.state.userAddress.map(e => {
                                    let addressid = e.addressid;
                                    return <div className='addressline' key={addressid}>{e.street + ' ' + e.city + ', ' + e.state + ' ' + e.zip}
                                    <button  className='profbut' onClick={() => this.removeAddress(this.state.user.id, addressid)}>
                                    <img className='deleteicon' src={deleteIcon} alt="delete-button"/>
                                    </button>
                                    </div>})
                                : null}
                                </div>
                                : <div className="addresses">
                                <h1>{this.state.userAddress == '' ? 'Addresses:' : null}</h1>
                                {this.state.userAddress ? this.state.userAddress.map(e => {
                                    let addressid = e.addressid;
                                    return <div className='addressline' key={addressid}>{e.street + ' ' + e.city + ', ' + e.state + ' ' + e.zip}
                                    <button className='profbut' onClick={() => this.removeAddress(this.state.user.id, addressid)}>
                                    <img className='deleteicon' src={deleteIcon} alt="delete-button"/>
                                    </button>
                                    </div>             
                                }) : null}
                                <button className='profilebutton' onClick={() => this.updateAddressShown()}>Add A New Address</button>
                                <div className="orderhistory">
                                <Link to="/api/profile/orderhistory"><button className='profilebutton'>Order History</button></Link>
                                </div>
                                </div>
                                }
                                </div>
                                </div>
                            </div>        
                        )        
                    }}
            </AppContext.Consumer>
                    : null
        );
    }
}
export default Profile;
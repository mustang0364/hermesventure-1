import React, { Component } from 'react';
import axios  from 'axios'


class Auth0 extends Component {
    constructor (){
      super();
      this.state={
        user:null,
        secureDataResponse:null,
      };
      this.logout = this.logout.bind(this)
      this.fetchSecureData = this.fetchSecureData.bind(this)
   }
   componentDidMount(){
     axios.get('/api/user-data').then(response => {
       this.setState({
         user:response.data
       })
     })
   }
   logout (){
     axios.post('/api/logout').then(()=> {
       this.setState({user:null})
     })
   }
    
    getMessage(error){
      return error.response
      ? error.response.data
      ? error.response.data.message
      : JSON.stringify(error.response.data, null, 2)
        : error.message;
    }
    
    fetchSecureData() {
      axios.get('/api/secure-data').then(response => {
        this.setState({ secureDataResponse: JSON.stringify(response.data, null, 2) });
      }).catch(error => {
        this.setState({ secureDataResponse: this.getMessage(error) });
      })
    }
    
  
    render() {
      console.log(this.state)
      const auth0 = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&response_type=code&scope=openid%20profile%20email&redirect_uri=${encodeURIComponent(`${window.location.origin}/auth/callback`)}`
      
      return (
        
  
        <div>
              <a href={auth0}><button>Log in</button></a>
             
              <button onClick={this.logout}>Log out</button>
       
              </div>
  
      
      );
    }
  }
  
  export default Auth0;
  
import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import Dashboard from './components/Dashboard.js';
import Home from './components/Home.js';
import ErrorBoundary from './components/ErrorBoundary'
import axios from 'axios';


class App extends Component {
  constructor(){
    super();

    this.state = {
      redirect: false,
      products: [],
    }
  }
  componentDidMount() {
    setTimeout(() => {
      axios.get('/api/dashboard').then(res => {
          this.setState({products: res.data})
      })   
    }, 500);
}
  redirect = () => {
    this.setState({
        redirect: true,
    })
}

  render() {
  
    return (
      
      <div className='appmain'>
      
      {this.state.redirect 
    
      ? <ErrorBoundary><Routes /></ErrorBoundary>
      
      : <div ><Home products={this.state.products} redirect={this.redirect} /> <Dashboard needsRedirect={this.state.redirect} products={this.state.products} redirect={this.redirect} /> <Routes /></div>
      }
      
        
      </div>
     
    );
  }
}

export default App;

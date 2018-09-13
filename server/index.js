const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const controller = require('./controller');
const session = require('express-session');
const axios = require('axios');
require('dotenv').config();
const app = express();
if(process.env.NODE_ENV === 'production') {
    app.use( express.static( `${__dirname}/../build` ) );
}
app.use(bodyParser.json());

//massive
massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db);
}).catch(error => {
  console.log('-------------- error', error);
});  

app.use(session({
  secret:process.env.SESSION_SECRET,
  saveUninitialized:false,
  resave:false,
}))




    
    app.post('/api/logout', (req, res) => {
      req.session.destroy();
      res.send();
    });
    
    app.get('/api/user-data', (req, res) => {
      res.json({ user: req.session.user });
    });
    
    function checkLoggedIn(req, res, next) {
      if (req.session.user) {
        next();
      } else {
        res.status(403).json({ message: 'Unauthorized' });
      }
    }
    
    app.get('/api/secure-data', checkLoggedIn, (req, res) => {
      res.json({ someSecureData: 123 });
    });
    

// Routes

app.get('/api/dashboard', controller.dashboard);
app.post('/api/createaddress', controller.createAddress);
app.get('/api/shopping/:category/:id', controller.getSingleProduct);
app.get('/api/getaddress/:id', controller.getAddress);
app.get('/api/fptibet', controller.getFPTibet);
app.get('/api/fpperu', controller.getFPPeru);
app.get('/api/fpmaldives', controller.getFPMaldives);
app.post('/api/orderNumber/:id', controller.createOrderNumber);
app.post('/api/charge', controller.stripe);
app.post('/api/createOrder', controller.createOrder);
app.get('/api/sort/products/:country', controller.sortCountry);
app.get('/api/sort/products/:country/:gender', controller.sortProducts);
app.get('/api/getUser', controller.getUser);
app.get('/api/dashboard/all', controller.shoppingDash);
app.delete('/api/removeaddress/:id/:addressid', controller.removeAddress);
app.get('/api/orderHistory', controller.orderHistory)
app.get('/api/invoice/:id', controller.getInvoice);
app.post('/api/refundRequest', controller.requestRefund);
app.post('/api/logout', (req, res) => {
    console.log('hit logout')
    req.session.destroy();
    res.redirect('/api')
})


app.get('/auth/callback', (req, res) => {
    
  console.log('hit auth callback')
  const payload = {
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code: req.query.code,
      grant_type: 'authorization_code',
      redirect_uri: `http://${req.headers.host}/auth/callback`
  }

  function tradeCodeForAccessToken() {

      return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)
  }

  function tradeAccessTokenForUserInfo(response) {

      return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo/?access_token=${response.data.access_token}`)
      
  }

  function storeUserInfoInDatabase(response) {

      return req.app.get('db').get_user(response.data.sub).then(users => {
          if(users.length) {

              req.session.user = users[0]
              res.redirect('/api')
          } else {
              const newUser = {
                  auth0id: response.data.sub,
                  name: response.data.name,
                  email: response.data.email,
              }
                  console.log(newUser)
              return req.app.get('db').create_user(newUser).then(newUsers => {
                  req.session.user = newUsers[0]
                  res.redirect('/api')
                })
            }
        })
    }
    
    tradeCodeForAccessToken()
    .then(tradeAccessTokenForUserInfo)
    .then(storeUserInfoInDatabase)
    .catch(err => {
        console.log('Error trade code for access token', err)
        res.status(500)
    })
})


if(process.env.NODE_ENV === 'production') {
    app.get('*', (req, res)=>{
      res.sendFile(path.join(__dirname, '../build/index.html'));
    })
}


    //port
const PORT = 4000;
app.listen(PORT, () => console.log(`Server Is Listening On port ${4000}`));



require('dotenv').config();
const stripe = require("stripe")(process.env.SECRET_KEY);
const nodemailer = require('nodemailer');


module.exports = {
    dashboard: (req, res) => {
        req.app.get('db').get_dashboard_products().then(products => {
            res.json(products)
            res.status(200)
        }).catch(err => console.log('error on Dashboard', err))
    },
    getSingleProduct: (req, res) => {
        let stuff = [];
        req.app.get('db').single_product(+req.params.id).then(product => {
            req.app.get('db').get_categories(req.params.category).then(products => {
                stuff.push(products)
                stuff.push(product[0])
                res.json(stuff)
            }).catch(err => console.log('error on getSingleProduct 1', err))
        }).catch(err => console.log('error on getSingleProduct 2', err))
    },
    getFPTibet: (req, res) => {
        req.app.get('db').get_fp_tibet()
        .then(data => {
            let indexOne = Math.floor(Math.random() * ((6 - 0) + 1) + 0);
            let indexTwo = Math.floor(Math.random() * ((12 - 7) + 1) + 7);
            let indexThree = Math.floor(Math.random() * ((18 - 13) + 1) + 13);
            let indexFour = Math.floor(Math.random() * ((25 - 19) + 1) + 19)
            res.send({
                productOneimage: data[indexOne].image,
                productOneCategory: data[indexOne].category,
                productOneid: data[indexOne].id,
                productTwoimage: data[indexTwo].image,
                productTwoCategory: data[indexTwo].category,
                productTwoid: data[indexTwo].id,
                productThreeimage: data[indexThree].image,
                productThreeCategory: data[indexThree].category,
                productThreeid: data[indexThree].id,
                productFourimage: data[indexFour].image,
                productFourCategory: data[indexFour].category,
                productFourid: data[indexFour].id,         
            })
            res.status(200)
        }).catch(err => console.log('error with getfeaturedproducts', err))
    },
    getFPMaldives: (req, res) => {
        req.app.get('db').get_fp_maldives()
        .then(data => {
            let indexOne = Math.floor(Math.random() * ((4 - 0) + 1) + 0);
            let indexTwo = Math.floor(Math.random() * ((8 - 5) + 1) + 5);
            let indexThree = Math.floor(Math.random() * ((12 - 9) + 1) + 9);
            let indexFour = Math.floor(Math.random() * ((16 - 13) + 1) + 13)
            res.send({
                productOneimage: data[indexOne].image,
                productOneCategory: data[indexOne].category,
                productOneid: data[indexOne].id,
                productTwoimage: data[indexTwo].image,
                productTwoCategory: data[indexTwo].category,
                productTwoid: data[indexTwo].id,
                productThreeimage: data[indexThree].image,
                productThreeCategory: data[indexThree].category,
                productThreeid: data[indexThree].id,
                productFourimage: data[indexFour].image,
                productFourCategory: data[indexFour].category,
                productFourid: data[indexFour].id,         
            })
            res.status(200)
        }).catch(err => console.log('error with getfeaturedproducts', err))
    },
    getFPPeru: (req, res) => {
        req.app.get('db').get_fp_peru()
        .then(data => {
            let indexOne = Math.floor(Math.random() * ((6 - 0) + 1) + 0);
            let indexTwo = Math.floor(Math.random() * ((10 - 7) + 1) + 7);
            let indexThree = Math.floor(Math.random() * ((16 - 11) + 1) + 11);
            let indexFour = Math.floor(Math.random() * ((21 - 17) + 1) + 17)
            res.send({
                productOneimage: data[indexOne].image,
                productOneCategory: data[indexOne].category,
                productOneid: data[indexOne].id,
                productTwoimage: data[indexTwo].image,
                productTwoCategory: data[indexTwo].category,
                productTwoid: data[indexTwo].id,
                productThreeimage: data[indexThree].image,
                productThreeCategory: data[indexThree].category,
                productThreeid: data[indexThree].id,
                productFourimage: data[indexFour].image,
                productFourCategory: data[indexFour].category,
                productFourid: data[indexFour].id,         
            })
            res.status(200)
        }).catch(err => console.log('error with getfeaturedproducts', err))
    },
    createOrderNumber: (req, res) => {
        console.log('order number created')
        req.app.get('db').create_order_number(+req.params.id).then(id => {
            console.log('order number created', id)
            res.json(id)
        }).catch(err => console.log('error with createOrderNumber', err))
    },
    stripe: (req, res) => {
        const { amount, currency, source } = req.body
        stripe.charges.create({
            amount: amount,
            currency: currency,
            source: source
        }, function(err, charge) {
            if(err) {
                console.log('error on stripe', err)
            } else if(charge) {
                res.json(charge)
                console.log("Successful Charge")
            }
        });
    },
    createOrder: (req, res) => {
        let orderNumber = req.body[0]
        console.log(orderNumber)
        let incomingCart = req.body[1]
        let address = req.body[2]
        let productIds = [];
        let quantity = [];
        let cart = [];
        for(let i = 0; i < incomingCart.length; i++) {
            cart.push(incomingCart[i])
        }
        for(let i = 0; i <cart.length; i++) {
            productIds.push(cart[i].id)
            quantity.push(cart[i].quantity)
        }
        
        
        for(let i = 0; i <productIds.length; i++) {
            req.app.get('db').create_order({
                product_id: productIds[i],
                cart_id: +orderNumber,
                quantity: quantity[i],
                address: address
            }).then(newOrder => {
                res.json(newOrder[0]);
            }).catch(err => console.log('error with create Order', err))
        }
    },
    sortCountry: (req, res) => {
        req.app.get('db').sort_country(req.params.country).then(products => {
            res.json(products)
        }).catch(err => console.log('error with sortCountry', err))
    },
    sortProducts: (req, res) => {
        const { country, gender } = req.params
        req.app.get('db').sort_products(country,gender).then(products => {
            res.json(products)
        }).catch(err => console.log('error on sort products', err))
        
    },
    getUser: (req, res) => {
        if(!req.session.user) {
            res.send("Not Authorized")
            return;
        }
        req.app.get('db').get_user(req.session.user.auth0id).then(users => {
            res.json(users[0])
        }).catch(err => console.log('error with getUser', err))
    },
    getAddress: (req, res) => {
        if(!req.session.user) {
            res.send("Not Authorized")
            return;
        }
        req.app.get('db').get_address(+req.params.id)
        .then(address => {
            res.json(
                address
            )
        })
    },
    shoppingDash: (req, res) => {
        req.app.get('db').get_products().then(products => {
            res.json(products)
            res.status(200)
        }).catch(err => console.log('error on Dashboard', err))
    },
    createAddress: (req, res) => {
        if(!req.session.user) {
            console.log('Not Authorized')
            res.send("Not Authorized")
            return;
        }
        const { user, streetInput, cityInput, stateInput, zipInput } = req.body;
        req.app.get('db').create_address([
           user.id, streetInput, cityInput, stateInput, zipInput
        ]).then(address => {
            res.json(address)
        }).catch(err => {
            console.log('error', err)
            res.json({message: 'error'})
        })
    },
    removeAddress: (req, res) => {
        if(!req.session.user) {
            res.send("Not Authorized")
            return;
        }
        req.params.id = parseInt(req.params.id);
        req.params.addressid = parseInt(req.params.addressid);
        req.app.get('db').remove_address(req.params.id, req.params.addressid)
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log('error', err)
            res.json({message: 'error here'})
        })
    },
    orderHistory: (req, res) => {
        if(!req.session.user) {
            res.send("Not Authorized")
            return;
        }
        console.log('hit order history')
        let arr
        req.app.get('db').get_orderHistory(+req.session.user.id).then(orderNumbers => {
            arr = orderNumbers
            let eachPromise = arr.map((e, i, a) => {
                    return req.app.get('db').get_products_by_orderNumber(e.cart_id)

                })
                Promise.all(eachPromise).then((resultOfAllPromiseResults) => {
                    res.json(resultOfAllPromiseResults)
                })
        })
    },
    getInvoice: (req, res) => {
        if(!req.session.user) {
            res.send("Not Authorized")
            return;
        }
        console.log('hit get invoice')
        console.log(+req.params.id)
        req.app.get('db').get_order_invoice(+req.params.id).then(orders => {
            res.json(orders)
        }).catch(err => console.log('error on getInvoice', err))
    },
    requestRefund: (req, res) => {
        if(!req.session.user) {
            res.send("Not Authorized")
            return;
        }
        console.log('Order Email Hit')
        console.log('order confirmation stuff', req.body)
        const { orderNumber, name, email, text} = req.body
        const hermes = 'hermesvent999@gmail.com'
        const htmlEmail = `
            <div style="background:#E0E0E0; padding:25px;">
                <h1 style="padding:25px;margin-bottom:-10px;">Refund Details</h1>
                <ul style="font-size:24px;list-style:none;">
                    <li>Order Number: ${orderNumber}</li>
                    <li>Name: ${name}</li>
                    <li>Email: ${email}</li>
                </ul>
                <h2 style="font-size:24px;">Message:</h2>
                <p style="padding:25px;font-size:18px;">${text}</p>

                <p>
                    Your refund request has been received. You will see
                    a response with instructions on how to send it
                    within 2 business days.
                </p>
                <h2>Sincerely,</h2>
                <h4>Hermes Venture</h4>
            </div>
        `
        var smtpTransport = nodemailer.createTransport({
            service: "gmail",
            port: 25,
            secure: false,
            auth: { 
                user: hermes, // Your gmail address.
                pass: process.env.EMAIL_PASSWORD
              
            },
            tls: {
                rejectUnauthorized: false
            }
          });
          
          var mailOptions = {
            from: hermes, // sender address
            to:  [email,hermes],// list of receivers
            subject: 'Refund Request', // Subject line
            text: text, // plaintext body
            html: htmlEmail, // html body
          };
          
          smtpTransport.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log('Error sending mail', error)
            } else {
              console.log('Message sent successfully! %s sent: %s', info.messageId, info.response);
            }
            smtpTransport.close();
          });
    }
}
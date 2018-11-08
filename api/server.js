const express = require('express');
// const helmet = require('helmet');  // in middleware.js
// const morgan = require('morgan');  // in middleware.js
// npm i express helmet morgan
// yarn add express helmet morgan

const gatekeeper = require('../gatekeeper/gatekeeperMiddleware.js');
// Add for Router
const productRouter = require('../products/productRouter.js');
// Add for Middleware
const configureMiddleware = require('../config/middleware.js');


const server = express();

// configure middleware
// ORDER MATTERS! they will execute top to bottom
// server.use(express.json()); // built in
// server.use(helmet()); // third party
// server.use(morgan('short')); // third party
configureMiddleware(server);
// custom

// server.use(gatekeeper); // using middleware globally

// configure endpoints (route handlers are middleware!!)
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.get('/secret', gatekeeper, (req, res) => {
  res.send(req.welcomeMessage);
});

// Remove below
// server.get('/api/products', (req, res) => {
//   res.send('GET /products')
// })

// add Folder products
// add File products.productRouter.js
server.use('/api/products', productRouter)

server.get('/api/products', (req, res) => {
  res.send('GET /clients')
})

server.get('/api/products', (req, res) => {
  res.send('GET /orders')
})

module.exports = server;

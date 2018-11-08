const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
// npm i express helmet morgan
// yarn add express helmet morgan

module.exports = server => {
  // ORDER MATTERS
  server.use(express.json());
  server.use(helmet());
  server.use(morgan('short'))
};
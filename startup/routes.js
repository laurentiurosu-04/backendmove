const express = require('express');
const error = require('../middleware/error');

const bodyParser = require('body-parser');

const listing = require('../routes/listing');
const users = require('../routes/users');
const auth = require('../routes/auth');

module.exports = function (app) {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(bodyParser.json());
  app.use('/api/listing', listing);
  app.use('/api/user', users);
  app.use('/api/auth', auth);
  app.use(error);
};

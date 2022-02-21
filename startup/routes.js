const express = require('express');
const error = require('../middleware/error');

const recipe = require('../routes/recipe');
const users = require('../routes/users');
const auth = require('../routes/auth');
const recipeUploadForm = require('../routes/recipeUploadForm');

module.exports = function (app) {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/api/auth/me', auth);
  app.use('/api/upload', recipeUploadForm);
  app.use('/api/auth', auth);
  app.use('/api/user', users);
  app.use('/api/recipe', recipe);
  app.use(error);
};

// const Joi = require('joi');
// const bcrypt = require('bcrypt');
// const _ = require('lodash');
// const { User } = require('../models/user');
// const express = require('express');
// const router = express.Router();

// router.post('/', async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let user = await User.findOne({ email: req.body.email });
//   if (!user) return res.status(400).send('Invalid email or password.');

//   const validPassword = await bcrypt.compare(req.body.password, user.password);
//   if (!validPassword) return res.status(400).send('Invalid email or password.');

//   const token = user.generateAuthToken();
//   res.send(token);
// });

// function validate(user) {
//   const schema = Joi.object({
//     email: Joi.string().min(5).max(255).required().email(),
//     password: Joi.string().min(5).max(255).required(),
//   });

//   return schema.validate(user);
// }

// module.exports = router;

const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('joi');

async function authenticateUser(clear, hashed) {
  return await bcrypt.compare(clear, hashed);
}

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

router.post('/', (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) return res.status(400).send('Invalid email or password');

      authenticateUser(req.body.password, user.password)
        .then((isValid) => {
          if (!isValid)
            return res.status(400).send('Invalid email or password');

          return res.send(user.generateAuthToken());
        })
        .catch((err) => {
          logServerErrorAndRespond(err, `Authentication error`, res);
        });
    })
    .catch((err) => {
      logServerErrorAndRespond(err, `Authentication error`, res);
    });
});

function logServerErrorAndRespond(err, friendlyMessage, res, statusCode = 500) {
  console.log(friendlyMessage, err);
  res.status(statusCode).send(`${friendlyMessage}: ${err.message}`);
}

module.exports = router;

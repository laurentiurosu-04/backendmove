const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

// router.post('/', async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     !user && res.status(404).json('user not found');

//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     !validPassword && res.status(400).json('wrong password');

//     const token = user.generateAuthToken();
//     res.send(token);

//     res.status(200).json(user);
//     console.error('works?');
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;

const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { Owner, validate } = require('../models/owner');

router.get('/', async (req, res) => {
  const owner = await Owner.find().sort('name');
  res.send(owner);
});

router.post('/', async (req, res) => {
  //400 bad request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let owner = new Owner({ name: req.body.name });
  listings = await listings.save();

  res.send(owner);
});

router.put('/:id', async (req, res) => {
  // look up the Listing
  //if not exista return 404
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const owner = await Owner.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  //validate
  //if invalid, return 400 - bad request
  //400 bad request
  if (!owner) return res.status(404).send('this Listing was not found');

  //update Listing
  res.send(owner);
  //return updated Listing
});

router.delete('/:id', async (req, res) => {
  const owner = await Owner.findByIdAndRemove(req.params.id);
  if (!owner) return res.status(404).send('this Listing was not found');
  res.send(owner);
});

router.get('/:id', async (req, res) => {
  const owner = await Owner.findById(req.params.id);
  if (!owner) {
    return res.status(404).send('this Listing was not found');
  }
  res.send(owner);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { Recipe, validate } = require('../models/recipe');

// const auth = require('../middleware/auth');
// const admin = require('../middleware/admin');

router.get('/', async (req, res) => {
  const recipe = await Recipe.find().sort('name');
  res.send(recipe);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let recipe = new Recipe({
    name: req.body.name,
    cookingTime: req.body.cookingTime,
    dificulty: req.body.dificulty,
    cookingTime: req.body.cookingTime,
    description: req.body.description,
  });

  recipe = await recipe.save();

  res.send(recipe);
});

// router.post('/', auth, async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let listings = new Listing({
//     name: req.body.name,
//     category: req.body.category,
//     adress: req.body.adress,
//   });

//   listings = await listings.save();

//   res.send(listings);
// });

// router.put('/:id', async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const listings = await Listing.findByIdAndUpdate(
//     req.params.id,
//     { name: req.body.name },
//     { new: true }
//   );

//   if (!listings) return res.status(404).send('this Listing was not found');

//   res.send(listings);
// });

// router.delete('/:id', [auth, admin], async (req, res) => {
//   const listings = await Listing.findByIdAndRemove(req.params.id);
//   if (!listings) return res.status(404).send('this Listing was not found');

//   res.send(listings);
// });

// router.get('/:id', async (req, res) => {
//   const listings = await Listing.findById(req.params.id);
//   if (!listings) {
//     return res.status(404).send('this Listing was not found');
//   }

//   res.send(listings);
// });

module.exports = router;

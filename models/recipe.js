const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
// const { ownerSchema } = require('./owner');
const { userSchema } = require('./user');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: `${userSchema}`,
  //   required: true,
  // },
  // category: {
  //   type: String,
  //   required: true,
  //   enum: ['apartment', 'studio apartment', 'house'],
  //   trim: true,
  // },
  cookingTime: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  dificulty: {
    type: String,
    required: true,
    trim: true,
    enum: ['easy', 'medium', 'hard'],
    minlength: 4,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  date: { type: Date, default: Date.now },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

function validateRecipe(recipe) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    // category: Joi.string().max(50).required(),
    cookingTime: Joi.string().min(5).max(50).required(),
    dificulty: Joi.string().max(50).required(),
    description: Joi.string().max(255).required(),
  });

  // userId: Joi.objectId().required(),
  return schema.validate(recipe);
}

exports.recipeSchema = recipeSchema;
exports.Recipe = Recipe;
exports.validate = validateRecipe;

// async function createOwner(name) {
//   const owner = new Owner({
//     name,
//   });
//   const result = await owner.save();
//   console.log(result);
// }

async function createRecipe(name, cookingTime, dificulty, description) {
  const recipe = new Recipe({
    name,
    cookingTime,
    dificulty,
    description,
  });
  const result = await recipe.save();
  console.log(result);
}

async function getListing() {
  const recipe = await Recipe.find().select('name');
  console.log(recipe);
}

createRecipe('what is this??', '30 min', 'easy', 'hello');
getListing();

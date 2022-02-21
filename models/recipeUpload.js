const mongoose = require('mongoose');

const recipeUploadForm = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  recipeImg: {
    type: Array,
  },
});

const RecipeUploadForm = mongoose.model('RecipeForm', recipeUploadForm);

exports.RecipeUploadForm = RecipeUploadForm;
exports.recipeUploadForm = recipeUploadForm;

// async function createRecipe(name, desc, recipeImg) {
//   const recipe = new Image({
//     name,
//     desc,
//     recipeImg,
//   });
//   const result = await recipe.save();
//   console.log(result);
// }

// createRecipe('hello img', 'works?', '4324');

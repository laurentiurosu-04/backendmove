const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
// const { ownerSchema } = require('./owner');

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: `${ownerSchema}`,
  //   required: true,
  // },
  category: {
    type: String,
    required: true,
    enum: ['apartment', 'studio apartment', 'house'],
    trim: true,
  },
  adress: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  date: { type: Date, default: Date.now },
});

const Listing = mongoose.model('Listing', listingSchema);

function validateListing(listing) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    category: Joi.string().max(50).required(),
    adress: Joi.string().max(50).required(),
  });

  // ownerId: Joi.objectId().required(),
  return schema.validate(listing);
}

exports.listingSchema = listingSchema;
exports.Listing = Listing;
exports.validate = validateListing;

// async function createOwner(name) {
//   const owner = new Owner({
//     name,
//   });
//   const result = await owner.save();
//   console.log(result);
// }

// async function createListing(name, owner, category) {
//   const listing = new Listing({
//     name,
//     owner,
//     category,
//   });
//   const result = await listing.save();
//   console.log(result);
// }

// async function getListing() {
//   const listing = await Listing.find().select('name');
//   console.log(listing);
// }

// createAuthor('Laur');
// createListing('what is this??', '615ebd02ef50cea99e202eed', 'apartment');
// getListing();

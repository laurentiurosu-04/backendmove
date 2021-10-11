const mongoose = require('mongoose');
const Joi = require('joi');
//temp db connection
// mongoose
//   .connect('mongodb://localhost/projectmove')
//   .then(() => console.log('connected to MongoDB...'))
//   .catch((err) =>
//     console.error('could not connect to mongoDB....', err.message)
//   );
//temp db connection

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
});

const Owner = mongoose.model('Owner', ownerSchema);

function validateOwner(owner) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    ownerId: Joi.objectId().required(),
  });

  return schema.validate(owner);
}

exports.ownerSchema = ownerSchema;
exports.Owner = Owner;
exports.validate = validateOwner;

// async function createOwner(name) {
//   const owner = new Owner({
//     name,
//   });
//   const result = await owner.save();
//   console.log(result);
// }

// createOwner('Laurrr');

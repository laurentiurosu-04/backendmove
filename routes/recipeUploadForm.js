let express = require('express');
let multer = require('multer');
let router = express.Router();
const path = require('path');
let { RecipeUploadForm } = require('../models/recipeUpload');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

router.get('/', async (req, res) => {
  const recipeForm = await RecipeUploadForm.find().sort('name');
  res.send(recipeForm);
});

router.post('/', upload.array('recipeImg', 12), async (req, res) => {
  const { error } = req.body;
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    const url = req.protocol + '://' + req.get('host');

    let recipeForm = new RecipeUploadForm({
      name: req.body.name,
      desc: req.body.desc,
      recipeImg: url + '/public/' + req.files.file,
    });

    await recipeForm
      .save()
      .then(() => {
        res.status(200).send('success');
      })
      .catch((err) => console.log(err.message));
    console.log(recipeForm);
  }
});

// async function createRecipeForm(req) {
//   const url = req.protocol + '://' + req.get('host');
//   return await new RecipeUploadForm({
//     name: req.body.name,
//     desc: req.body.desc,
//     recipeImg: url + '/public/' + req.files.file,
//   }).save();
// }

// function logServerErrorAndRespond(err, friendlyMessage, res, statusCode = 500) {
//   console.log(friendlyMessage, err.message);
//   res.status(statusCode).send(`${friendlyMessage}: ${err.message}`);
// }

// router.post('/', upload.array('recipeImg', 12), (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   createRecipeForm(req.body)
//     .then((newRecipe) => {
//       res.send(newRecipe);
//     })
//     .catch((err) => {
//       logServerErrorAndRespond(err, `Error trying to create movie`, res);
//     });
// });

module.exports = router;

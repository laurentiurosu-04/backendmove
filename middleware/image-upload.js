const multer = require('multer');

const imageStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${process.env.SERVER_STORAGE}/images`);
  },
  filename: (req, file, callback) => {
    callback(null, `image_${Date.now()}`);
  },
});

const imageFilter = (req, file, callback) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jfif' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif'
  ) {
    callback(null, true);
  } else {
    callback(new Error('Image type not supported!'), false);
  }
};

const image_upload = multer({ storage: imageStorage, fileFilter: imageFilter });

module.exports = { image_upload };

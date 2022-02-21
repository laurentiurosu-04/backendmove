const express = require('express');
const app = express();
const path = require('path');

var cors = require('cors');
app.use(cors());

app.set('public', path.join(__dirname, 'public'));

const winston = require('winston');

var allowlist = [
  'http://localhost/api/user/',
  'http://localhost/api/auth/me',
  'http://localhost/api/upload',
  'http://localhost/api/recipe/',
  'http://localhost/api/me/',
];

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.post('/api/upload', cors(corsOptionsDelegate), function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for an allowed domain.' });
  next();
});

app.post('/api/user', cors(corsOptionsDelegate), function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for an allowed domain.' });
  next();
});

app.post('/api/auth', cors(corsOptionsDelegate), function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for an allowed domain.' });
  next();
});

// app.get('/api/auth/me', cors(corsOptionsDelegate), function (req, res, next) {
//   res.json({ msg: 'This is CORS-enabled for an allowed domain.' });
//   next();
// });

app.post('/api/recipe', cors(corsOptionsDelegate), function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for an allowed domain.' });
  next();
});

require('./startup/db')();
require('./startup/config')();
require('./startup/validation');
require('./startup/routes')(app);
require('./startup/loggin');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
  winston.info(`Listening on port ${port}...`);
});

const express = require('express');
const app = express();

var cors = require('cors');
app.use(cors());

const winston = require('winston');

var allowlist = [
  'http://localhost/api/user/',
  'http://localhost/api/listing/',
  'http://localhost/api/me/',
  'http://localhost:19002/',
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

// app.post('/api/auth', cors(corsOptionsDelegate), function (req, res, next) {
//   res.json({ msg: 'This is CORS-enabled for an allowed domain.' });
//   next();
// });

app.post('/api/user', cors(corsOptionsDelegate), function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for an allowed domain.' });
  next();
});

app.post('/api/listing', cors(corsOptionsDelegate), function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for an allowed domain.' });
  next();
});

// app.get('/api/listing', cors(corsOptionsDelegate), function (req, res, next) {
//   res.json({ msg: 'This is CORS-enabled for an allowed domain.' });
//   next();
// });

require('./startup/loggin');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
  winston.info(`Listening on port ${port}...`);
});

// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', ['*']);
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.append('Access-Control-Request-Headers: Content-Type');
//   next();
// });

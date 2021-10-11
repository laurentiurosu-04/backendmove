const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

const config = require('config');

winston.add(
  new winston.transports.MongoDB({
    db: config.get('db'),
    options: { useUnifiedTopology: true },
    metaKey: 'meta',
  })
);

winston.add(new winston.transports.File({ filename: 'logfile.log' }));

winston.exceptions.handle(
  new winston.transports.File({ filename: 'uncaughtException.log' })
);

winston.exceptions.handle(
  new winston.transports.File({ filename: 'unhandledRejection.log' })
);

module.exports = function (err, req, res, next) {
  // Log the exception
  winston.error({
    message: err.message,
    level: err.level,
    stack: err.stack,
    meta: err,
  });

  res.status(500).send('Something failed..Cannot connect to Server');
};

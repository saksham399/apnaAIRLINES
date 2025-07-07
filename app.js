const express = require('express');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const router = require('./routes/flightRoutes');
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 5,
  windowMs: 60 * 1000,
  message: 'Too many requests from this IP',
  standardHeaders: true
});
app.use('/v1/flights', limiter);

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use('/v1/flights', router);
module.exports = app;
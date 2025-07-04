const express = require('express');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const router = require('./routes/flightRoutes');
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);



const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP'
});
app.use('/api', limiter);

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use('/v1/flights', router);
module.exports = app;
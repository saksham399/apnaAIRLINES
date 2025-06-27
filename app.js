const express = require('express');
const morgan = require('morgan');

const router = require('./routes/flightRoutes');
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use('/v1/flights', router);
module.exports = app;
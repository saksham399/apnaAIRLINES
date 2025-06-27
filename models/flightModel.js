const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: [true, 'A flight must have a flight number'],
        unique: true
    },
    aircraft: {
        type: String,
        required: true
    },
    airline: {
        type: String,
        required: [true, 'A flight must have an airline']
    },
    origin: {
        type: String,
        required: [true, 'A flight must have an origin']
    },
    destination: {
        type: String,
        required: [true, 'A flight must have a destination']
    },
    departure: {
        type: Date,
        required: [true, 'A flight must have a departure time']
    },
    arrival: {
        type: Date,
        required: [true, 'A flight must have an arrival time']
    },
    capacity: {
        type: Number,
        required: [true, 'A flight must have a capacity']
    },
    occupation: {
        type: Number,
        default: 0
    },
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

flightSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;

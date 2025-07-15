const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: [true, 'A flight must have a flight number'],
        unique: true,
        minlength: [2, 'Flight number must be at least 2 characters'],
        maxlength: [6, 'Flight number must be at most 6 characters']
    },
    aircraft: {
        type: String,
        required: true,
        maxlength: [20, 'Aircraft name must be at most 20 characters']
    },
    airline: {
        type: String,
        required: [true, 'A flight must have an airline'],
        maxlength: [30, 'Airline name must be at most 30 characters']
    },
    origin: {
        type: String,
        required: [true, 'A flight must have an origin'],
        maxlength: [50, 'Origin must be at most 50 characters']
    },
    destination: {
        type: String,
        required: [true, 'A flight must have a destination'],
        maxlength: [50, 'Destination must be at most 50 characters']
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
  if (this.occupation > this.capacity) {
    return next(new Error('Occupation cannot exceed capacity'));
  }
  if (this.departure > this.arrival) {
    return next(new Error('Departure time must be before arrival time'));
  }
  next();
});

flightSchema.pre('findOneAndUpdate', async function(next) {
  if (this.occupation > this.capacity) {
    return next(new Error('Occupation cannot exceed capacity'));
  }
  if (this.departure > this.arrival) {
    return next(new Error('Departure time must be before arrival time'));
  }
  next();
});


const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;

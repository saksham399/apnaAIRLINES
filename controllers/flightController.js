const Flight = require('../models/flightModel');
const APIFeatures = require('../utils/apiFeatures');
const mongoose = require('mongoose');

exports.getAllFlights = async (req, res) => {
    try{
        const features = new APIFeatures(Flight.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
            
        const flights = await features.query;
        res.status(200).render('overview', {
            title: 'All Flights',
            flights
        });
    } catch (err) {
        res.status(500).render('error', {
            title: 'Error',
            message: 'Unable to load flights'
        });
    }
}

exports.getFlight = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ status: 'fail', message: 'Invalid flight ID format' });
        }   
        const flight = await Flight.findById(req.params.id);
        res.status(200).render('flight', {
            title: 'Flight Details',
            flight
        });
    } catch (err) {
        res.status(500).render('error', {
            title: 'Error',
            message: 'Unable to load flight'
        });
    }
}

exports.createFlight = async (req, res) => {
    try {
        if (!Object.keys(req.body).length) {
            return res.status(400).json({ status: 'fail', message: 'No data provided' });
        }
        const newFlight = await Flight.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                flight: newFlight
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: "Invalid data sent",
            error: err.message
        });
    }
}   

exports.updateFlight = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ status: 'fail', message: 'Invalid flight ID format' });
        }
        if (!Object.keys(req.body).length) {
            return res.status(400).json({ status: 'fail', message: 'No data provided' });
        }
        const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators:  true
        });
        res.status(200).json({
            status: 'success',
            data: {
                flight: updatedFlight
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: "Invalid data sent",
            error: err.message
        });
    }
}

exports.deleteFlight = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ status: 'fail', message: 'Invalid flight ID format' });
        }
        const flight = await Flight.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'error',
            message: 'No such flight found',
            error: err.message
        });
    }
}

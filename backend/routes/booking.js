const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create a new booking
router.post('/', async (req, res) => {
    try {
        const { user, vetId, date } = req.body;

        // Validate required fields
        if (!user || !vetId || !date) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields',
                message: 'Please provide all required fields: user, vetId, date.'
            });
        }

        const newBooking = new Booking({ user, vetId, date, status: 'pending' });
        const booking = await newBooking.save();

        res.status(201).json({
            success: true,
            message: 'Booking successful!',
            data: booking
        });
    } catch (err) {
        console.error('Error processing request:', err);

        if (err.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                message: err.message
            });
        } else if (err.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid ID Format',
                message: 'Please provide a valid MongoDB ObjectId.'
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Internal Server Error',
                message: 'Something went wrong on our end. Please try again later.'
            });
        }
    }
});

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking');

// // Endpoint to create a booking appointment
// router.post('/', async (req, res) => {
//   const { user, vetId, date } = req.body;
//   if (!user || !vetId || !date) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     const booking = new Booking({ user, vetId, date });
//     await booking.save();
//     res.json({ message: 'Booking successful', booking });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

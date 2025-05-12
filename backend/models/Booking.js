const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: String, required: true },
  vetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vet', required: true },
  date: { type: Date, required: true },
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Booking', BookingSchema);

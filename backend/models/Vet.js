const mongoose = require('mongoose');

const VetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  services: { type: [String], required: true },
  contact: { type: String, required: true }
});

module.exports = mongoose.model('Vet', VetSchema);

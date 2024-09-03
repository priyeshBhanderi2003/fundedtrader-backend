const mongoose = require('mongoose');

const BtnVariationsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  collection: 'btnVariations'
});

// Create the model
const BtnVariations = mongoose.model('btnVariations', BtnVariationsSchema);

module.exports = BtnVariations;

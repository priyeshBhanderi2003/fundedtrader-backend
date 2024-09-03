const mongoose = require('mongoose');

const FaqsSchema = new mongoose.Schema({
    question:{
        type: String,
    required: true
    },
  title: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  collection: 'faqs'
});

// Create the model
const Faqs = mongoose.model('faqs', FaqsSchema);

module.exports = Faqs;

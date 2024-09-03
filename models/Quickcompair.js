const mongoose = require('mongoose');

const QuickcompairSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    collection: 'quickcomparison'
});

// Create the model
const Quickcompair = mongoose.model('quickcomparison', QuickcompairSchema);

module.exports = Quickcompair;

const mongoose = require('mongoose');

const KeyPhasesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    phase_title: {
        type: String,
        required: true,
    },
    phase_data: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    collection: 'keyphases'
});

const KeyPhases = mongoose.model('KeyPhases', KeyPhasesSchema);

module.exports = KeyPhases;

const mongoose = require('mongoose');

const EvaluationProcessSchema = new mongoose.Schema({
    title: {
        type: String,       
        required: true      
    },
    sub_title: {
        type: String,       
        required: true      
    },
    phase: {
        type: String,       
        required: true      
    }
}, {
    timestamps: true,
    collection: 'evaluationprocess'
});


const EvaluationProcess = mongoose.model('EvaluationProcess', EvaluationProcessSchema);

module.exports = EvaluationProcess;

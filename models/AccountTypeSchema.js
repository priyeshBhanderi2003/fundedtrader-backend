const mongoose = require('mongoose');

const AccountTypeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    account_type_id: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    collection: 'accounttype'
});

// Create the model
const AccountType = mongoose.model('accounttype', AccountTypeSchema);

module.exports = AccountType;

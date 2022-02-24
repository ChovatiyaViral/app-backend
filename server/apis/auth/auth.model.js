const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Registration', RegistrationSchema);


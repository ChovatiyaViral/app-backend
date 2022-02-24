const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
    first_name: {
        type: "string",
        required: true
    },
    email: {
        type: "string",
        required: true
    },
    password: {
        type: "string",
        required: true
    }
});

module.exports = mongoose.model('Registration', RegistrationSchema);


const mongoose = require('mongoose');

const EventsSchema = new mongoose.Schema({
    event_name: {
        type: String,
        required: true
    },
    event_address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Events', EventsSchema);
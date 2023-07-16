const mongoose = require('mongoose');
const {Schema} = mongoose;

const eventSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
}, {timestamps: true});

const event = mongoose.model('event', eventSchema);

module.exports = event;

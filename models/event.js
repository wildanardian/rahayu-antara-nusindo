const mongoose = require('mongoose');
const {Schema} = mongoose;

const eventSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
}, {timestamps: true});

module.exports = mongoose.model('event', eventSchema);;

const mongoose = require('mongoose');
const {Schema} = mongoose;

const mediaReleaseSche = new Schema({
    title: { type: String, required: true },
    image: [{ type: String, required: true }],
    content: { type: String, required: true },
    status: { type: String, required: false },
}, {timestamps: true});

module.exports = mongoose.model('mediaRelease', mediaReleaseSche);

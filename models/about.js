const mongoose = require('mongoose');
const {Schema} = mongoose;

const abaoutSchema = new Schema({
    title: { type: String, required: true, title: 'Title' },
    content: { type: String, required: true, title: 'Content' },
    image: { type: String, required: true, title: 'Image' },
}, {timestamps: true});

const abaout = mongoose.model('abaout', abaoutSchema);

module.exports = abaout;

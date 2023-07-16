const mongoose = require('mongoose');
const {schema} = mongoose;

const abaoutSchema = new Schema({
    title: { type: String, required: true, title: 'Title' },
    content: { type: String, required: true, title: 'Content' },
}, {timestamps: true});

const abaout = mongoose.model('abaout', abaoutSchema);

module.exports = abaout;


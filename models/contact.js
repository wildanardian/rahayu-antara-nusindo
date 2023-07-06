const mongoose = require('mongoose');
const {Schema} = mongoose;

const contactSchema = new Schema({
    whasapp: { type: Number, required: true, title: 'WhasApp' },
    facebook: { type: String, required: true, title: 'Facebook' },
    instagram: { type: String, required: true, title: 'Instagram' },
    youtube: { type: String, required: true, title: 'Youtube' },
    twitter: { type: String, required: true, title: 'Twitter' },
    email: { type: String, required: true, title: 'Email' },
}, {timestamps: true});

const contact = mongoose.model('contact', contactSchema);

module.exports = contact;

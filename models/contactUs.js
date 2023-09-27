const mongoose = require('mongoose');
const {Schema} = mongoose;

const contactSchema = new Schema({
    firstName: { type: String, required: true, title: 'First Name' },
    lastName: { type: String, required: true, title: 'Last Name' },
    email: { type: String, required: true, title: 'Email' }, //email orang
    subject: { type: String, required: true, title: 'Subject' },
    message: { type: String, required: true, title: 'Message' },
}, {timestamps: true});

const contact = mongoose.model('contact', contactSchema);

module.exports = contact;
    
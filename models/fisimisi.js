const mongoose = require('mongoose');
const {Schema} = mongoose;

const fisimisiSchema = new Schema({
    contentVisi: { type: String, required: true, title: 'Content Visi' },
    contentMisi: { type: String, required: true, title: 'Content Misi' },
}, {timestamps: true});

const fisimisi = mongoose.model('fisimisi', fisimisiSchema);

module.exports = fisimisi;

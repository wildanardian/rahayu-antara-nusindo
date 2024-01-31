const mongoose = require('mongoose');
const {Schema} = mongoose;

const mitraSchema = new Schema({
    nama : {type: String , required: true},
    image : {type: String, required: true},

},{timestamps: true})


const mitra = mongoose.model('mitra',mitraSchema);

module.exports = mitra

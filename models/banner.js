const mongoose = require('mongoose');
const {Schema} = mongoose;

const bannerSchema = new Schema({
    nama : {type: String , required: true},
    image : {type: String, required: true},
},{timestamps: true})

const banner = mongoose.model('banner',bannerSchema);

module.exports = banner

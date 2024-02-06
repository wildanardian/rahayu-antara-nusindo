const mongoose = require('mongoose');
const {Schema} = mongoose;

const kategoriSchema = new Schema({
    nama : {type: String , required: true},
    ofp : [{type: Schema.Types.ObjectId, ref: 'ofp',required:false}]
},{timestamps: true});

const kategori = mongoose.model('kategori',kategoriSchema);

module.exports = kategori

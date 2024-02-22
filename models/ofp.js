const mongoose = require('mongoose');
const {Schema} = mongoose;

const ofpSchema = new Schema({
    title: {type: String, required: true},
 
    image: [{type: String, required: false}],

    content: {type: String, required: true},
    price: {type: String, required: false},
    selected: {type: Boolean, required: false},
    desktipsi: {type: [String], required: false}, // jadiin array
    spesifikasi: {type: [String], required: false},
    kategori: {type: Schema.Types.ObjectId, ref: 'kategori', required:false}
}, {timestamps: true})

const ofp = mongoose.model('ofp', ofpSchema);

module.exports  = ofp;

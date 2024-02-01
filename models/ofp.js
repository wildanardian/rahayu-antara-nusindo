const mongoose = require('mongoose');
const {Schema} = mongoose;

const ofpSchema = new Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},
    content: {type: String, required: true},
    price: {type: String, required: false},
    selected: {type: Boolean, required: false},
    kategori: {type: Schema.Types.ObjectId, ref: 'kategori', required:false}
}, {timestamps: true})

const ofp = mongoose.model('ofp', ofpSchema);

module.exports  = ofp;

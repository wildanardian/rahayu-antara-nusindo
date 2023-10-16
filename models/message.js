const mongoose = require('mongoose');
const {Schema} = mongoose;

const messageSchema = new Schema({
    firstName: {type: String,required: true},
    lastName: {type: String,required: true},
    email:{type: String,required: true},
    message:{type: String,required: true},
    subject:{type: String,required: true},
});

module.exports = mongoose.model('message', messageSchema);

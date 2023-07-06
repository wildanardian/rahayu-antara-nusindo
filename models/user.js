const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    jabatan: { type: String, required: false },
}, {timestamps: true})

const user = mongoose.model('user', userSchema);

module.exports = user;

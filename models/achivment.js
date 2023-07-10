const moongoose = require('mongoose')
const {Schema} = moongoose

const achivmentSchema = new Schema({
    title: { type: String, required: true, title: 'Title', contentType: 'String'},
    content: { type: String, required: true, title: 'Content', contentType: 'text' },
    image: { data: Buffer , required: true, title: 'Image' , contentType: 'String'},
},{timestamps: true})

const achivment = moongoose.model('achivment', achivmentSchema)

module.exports = achivment

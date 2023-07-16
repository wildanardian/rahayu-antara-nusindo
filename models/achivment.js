const mongoose = require('mongoose');
const { Schema } = mongoose;

const achievementSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;

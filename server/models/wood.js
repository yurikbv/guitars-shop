const mongoose = require('mongoose');

const woodSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    maxlength: 100,
    unique: true
  }
});

const Wood = mongoose.model("Wood", woodSchema);

module.exports = {Wood};
const mongoose = require('mongoose')

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  createdAt: {
    type: Number,
    default: Date.now() // Get a timestamp :)
  }
})

const businessModel = mongoose.model('business', businessSchema)

module.exports = businessModel

const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The offer must have a name']
  },
  business: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'business',
  }],
  categories : {
    type: Array,
  },
  timesUsed: {
    type: Number,
  },
  createdAt: {
    type: Number,
    default: Date.now() // Get a timestamp :)
  }
})

const offerModel = mongoose.model('offer', offerSchema)

module.exports = offerModel
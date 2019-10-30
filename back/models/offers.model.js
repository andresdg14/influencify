const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The offer must have a name']
  },

  description: {
    type: String,
    required: [true, 'The offer must have a description']
  },

  offerURL: {
    type: String,
  },

  offerCode: {
    type: String,
  },

  business: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'business',
  }],

  influencer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'influencer',
    required: [true, 'The offer must relate to an influencer']
  },

  categories : {
    type: Array,
  },

  timesUsed: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Number,
    default: Date.now() // Get a timestamp :)
  }
  
})

const offerModel = mongoose.model('offer', offerSchema)

module.exports = offerModel
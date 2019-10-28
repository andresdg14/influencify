const mongoose = require('mongoose')

const InfluencerSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  username: {
    type: String,
    required: true,
    unique: [true, 'This username is already registered']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator(value) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
      }
    },
    unique: [true, 'This email is already registered']
  },
  password: {
    type: String,
    required: true
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  offers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'offer'
  }],
  facebookURL: {
    type: String,
    required: false
  },
  twitterURL: {
    type: String,
    required: false
  },
  instagramURL: {
    type: String,
    required: false
  },
  pinterestURL: {
    type: String,
    required: false
  },
  createdAt: {
    type: Number,
    default: Date.now() // Get a timestamp :)
  }
})

const influencerModel = mongoose.model('influencer', influencerSchema)

module.exports = influencerModel
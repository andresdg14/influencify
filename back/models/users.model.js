const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator (value) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
      }
    },
    unique: [true, 'This email is already registered']
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: [true, 'This username is already registered']
  },
  birthDate: {
    type: Number,
    required: false
  },
  genre: {
    type: String,
    required: false
  },
  influencers: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'influencer',
    default: "5db82fc960838b82f8fe9c77",
    unique: [true, "You already follow this influencer"]
  }],
  favOffers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'offer',
  }],
  usedOffers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'offer',
  }],
  createdAt: {
    type: Number,
    default: Date.now() // Get a timestamp :)
  }
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel

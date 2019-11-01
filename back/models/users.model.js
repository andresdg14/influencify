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
    type: Date
  },
  genre: {
    type: String,
    enum: ['Male', 'Female']
  },
  influencers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'influencer',
      // TODO https://docs.mongodb.com/manual/reference/operator/update/addToSet/#up._S_addToSet
    }
  ],
  favOffers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'offer',
  }],
  usedOffers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'offer',
  }],

  profileImg: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now() // Get a timestamp :)
  }
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel

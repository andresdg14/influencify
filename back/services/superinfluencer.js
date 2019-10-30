const InfluencerModel = require('../models/influencers.model')

const superInfluencer = (req, res, next) => {
  console.log('hola mundo')
  InfluencerModel
    .findOne({ email: 'andresdomlez@gmail.com' })
    .then(influencer => {
      if (influencer) {
        res.locals.superInfluencer = influencer
        next()
      } else {
        InfluencerModel.create({
          name: 'Andres',
          username: 'andres',
          email: 'andresdomlez@gmail.com'
        })
      }
    })
}

module.exports = superInfluencer
const InfluencerModel = require('../models/influencers.model')

const superInfluencer = (req, res, next) => {
  console.log('hola mundo')
  InfluencerModel
    .findOne({
      email: 'influencify@example.org'
    })
    .then(influencer => {
      if (influencer) {
        res.locals.superInfluencer = influencer
        next()
      } else {
        InfluencerModel.create({
          name: 'Influencify',
          username: 'influencify',
          email: 'influencify@example.org',
          profileImg: 'img/icon.png'
        })
      }
    })
}

module.exports = superInfluencer
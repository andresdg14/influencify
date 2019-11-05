const urlParams = new URLSearchParams(window.location.search);
const influencerID = urlParams.get('influencerID');

console.log({
  influencerID
});


API.getInfluencerById(influencerID)
  .then((influencer) =>{
    console.log(influencer)
  })
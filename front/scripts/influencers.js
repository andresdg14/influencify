function loadInfluencers() {

}

function reply_click(clicked_id) {
  influencerId = clicked_id;

  API.followInfluencerByUserId(influencerId)
    .then(response => {
      console.log('Hice la peticion');
      console.log(response);
    })
}

var followButtons = document.getElementsByClassName('followButton');
console.log(followButtons.length);

for (var i = 0; i < followButtons.length; i++) {
  followButtons.addEventListener('click', (event) => {
    reply_click();
  })
}

  API.getMyInfluencers()
    .then(influencers => {
      console.log({
        influencers
      });
      var ih = document.getElementById('my-influencers')
      influencers.forEach(elem => {
        var p = document.createElement('p');
        p.innerHTML = elem.name;
        ih.appendChild(p)
      });
    })
    .catch(function (error) {
      console.log(error.response);
    });

  API.getAllInfluencers()
    .then(influencers => {
      console.log({
        influencers
      });
      var il = document.getElementById('influencers-list')
      influencers.forEach(elem => {
        var div = document.createElement('div');
        div.innerHTML = `<img src="${elem.profileImg}" class="profile-img rounded-circle"><h2>${elem.name}</h2><div><a href="${elem.instagramURL}"><img src="img/instagram125x125.png" class="social-icon"></a><a href="${elem.facebookURL}"><img src="img/facebook125x125.png" class="social-icon"></a><a href="${elem.twitterURL}"><img src="img/twitter125x125.png" class="social-icon"></a></div><div><button class="followButton btn btn-primary" id="follow-${elem._id}" onClick="reply_click('${elem._id}')">Follow</button></div>`
        div.className="influencer-item"
        il.appendChild(div)
      });
    })
    .catch(function (error) {
      console.log(error.response);
    })
    
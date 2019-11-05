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


document.addEventListener("DOMContentLoaded", function () {

  //Listado de influencers que sigue el usuario logueado
  API.getMyInfluencers()
    .then(influencers => {
      var ih = document.getElementById('myinfluencer')
      influencers.forEach(elem => {
        var div = document.createElement('div');
        div.innerHTML = `
<div class="col-3">        
  <img src="${elem.profileImg}" class="profile-img rounded-circle">
</div>
<div class="col-9 d-flex flex-column align-items-start">
  <div class="row">
    <h2>${elem.name}</h2>
  </div>
  <div class="row">
    <a href="${elem.instagramURL}">
      <img src="img/instagram125x125.png" class="social-icon">
    </a>
    <a href="${elem.facebookURL}">
      <img src="img/facebook125x125.png" class="social-icon">
    </a>
    <a href="${elem.twitterURL}">
      <img src="img/twitter125x125.png" class="social-icon">
    </a>
  </div>
</div>
<hr>
    `;
        var hr = document.createElement('hr')
        div.className = "row";
        ih.appendChild(div)
        ih.appendChild(hr)
      });
      
    })
    .catch(function (error) {
      console.log(error.response);
    });

  API.getMyInfluencersOffers()
    .then(offers => {
      var offersMerged = [].concat.apply([], offers);
      var mo = document.getElementById('mycoupon')
      offersMerged.forEach(elem => {
        console.log(elem.name);
        var div = document.createElement('div');
        div.innerHTML = `<p>${elem.name}</p>`
        var hr = document.createElement('hr')
        div.className = "row";
        mo.appendChild(div)
        mo.appendChild(hr)
        });
      })
      .catch(function (error) {
        console.log(error.response);
      });
    

  //Listado de cupones que el usuario ha marcado como favorito
  API.getMyFavOffers()
    .then(offers => {
      console.log({
        offers
      });
      var oh = document.getElementById('offers-home')
      offers.forEach(elem => {
        var p = document.createElement('p');
        p.innerHTML = elem.name;
        oh.appendChild(p)
      });
    })
    .catch(function (error) {
      console.log(error.response);
    })


  //Listado de todos los influencers
  API.getAllInfluencers()
    .then(influencers => {
      console.log({
        influencers
      });
      var il = document.getElementById('influencers-list')
      influencers.forEach(elem => {
        var div = document.createElement('div');
        div.innerHTML = `<span>${elem.name}</span>
        <button class="followButton btn btn-primary" id="follow-${elem._id}" onClick="reply_click('${elem._id}')">Follow</button>`;
        il.appendChild(div)
      });
    })
    .catch(function (error) {
      console.log(error.response);
    })

  //Nombre del usuario logueado
  const p = document.getElementById('username')
  p.innerHTML = localStorage.getItem("username");
  authenticated();
});

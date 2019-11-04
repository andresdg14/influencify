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

document.getElementById('logout-link').addEventListener('click', (event) => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("id");
  window.location.assign('index.html');
})


document.addEventListener("DOMContentLoaded", function () {

  //Listado de influencers que sigue el usuario logueado
  API.getMyInfluencers().then(influencers => {
      console.log({
        influencers
      });
      var ih = document.getElementById('influencers-home')
      influencers.forEach(elem => {
        var p = document.createElement('p');
        p.innerHTML = elem.name;
        ih.appendChild(p)
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

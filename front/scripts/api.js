function authenticated() {
  if (localStorage.getItem('token')) {
    document.getElementById('home').style.display = ''
  } else {
    location.href = './index.html'
  }
}

const api = axios.create({
  baseURL: "http://localhost:2222/api/",
  timeout: 1000
});

const API = {
  signup: function (newUser) {
    api.post("auth/signup", newUser)
    .then(function (response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("profileImg", response.data.profileImg);
      localStorage.setItem("id", response.data._id);
      authenticated()
    })
    .catch(function (error) {
      console.log(error.response);
    })
  },
  login: function (newUser){
    api.post("auth/login", newUser)
    .then(function (response) {
      if (response.data.error) {
        alert("YOSSS HACKER SAL DE AQUI")
      } else {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("profileImg", response.data.profileImg);
        localStorage.setItem("id", response.data._id);
        console.log(response.data);
        authenticated()
      }
    })
    .catch(function (error) {
      console.log(error.response);
    });
  },
getMyInfluencers: function () {
  return api
    .get(`users/${localStorage.getItem("id")}`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    .then(function (response) {
      return response.data.influencers
    })
    .catch(function (error) {
      console.log(error.response);
    });
},
getMyInfluencersOffers: function () {
  return api
    .get(`users/${localStorage.getItem("id")}`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    .then(function (response) {
      console.log(response.data.influencers.map(inf => inf.offers))
      return response.data.influencers.map(inf => inf.offers)
    })
    .catch(function (error) {
      console.log(error.response);
    });
},
getCurrentUserById: function () {
  return api
    .get(`users/${localStorage.getItem("id")}`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error.response);
    });
},
  getMyFavOffers: function () {
    return api
      .get(`users/${localStorage.getItem("id")}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(function (response) {
        return response.data.favOffers
      })
      .catch(function (error) {
        console.log(error.response);
      });
  },

  getAllInfluencers: function () {
    return api
      .get("influencers", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        console.log(error.response);
      });
  },

  getFilteredInfluencersList: function () {
    return api
      .get(`users/${localStorage.getItem("id")}/influencerslist`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        console.log(error.response);
      });
  },
  followInfluencerByUserId: function (influencerId) {
    return api
      .post(`users/${localStorage.getItem("id")}/follow/${influencerId}`, {}, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(response => {
        return response.data
      })
      .catch(function (error) {
        console.log(error.response);
      })
  },

  getInfluencerById: function (influencerId) {
    return api
      .get(`influencers/${influencerId}`, {}, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(response => {
        return response.data
      })
      .catch(function (error) {
        console.log(error.response);
      })
  }

}

document.getElementById('logout-link').addEventListener('click', (event) => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("id");
  window.location.assign('index.html');
})





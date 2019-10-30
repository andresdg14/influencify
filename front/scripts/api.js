function authenticated() {
  if (localStorage.getItem('token')) {
    document.getElementById('home').style.display = ''
    document.getElementById('auth').style.display = 'none'
  } else {
    document.getElementById('home').style.display = 'none'
    document.getElementById('auth').style.display = ''
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
        console.log(response.data);
        authenticated()
      }
    })
    .catch(function (error) {
      console.log(error.response);
    });
  },
  getMyInfluencers: function(){
    return api
      .get("users", { headers: { token: localStorage.getItem("token") } })
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }
}





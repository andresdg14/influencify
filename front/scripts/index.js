function authenticated() {
  if(localStorage.getItem('token')) {
    location.href = './home.html'
  }
}

document.getElementById('btn-signup').addEventListener('click', (event) => {
  const newUser = {
    name: document.getElementById("user_name").value,
    username: document.getElementById("user_username").value,
    email: document.getElementById("user_email").value,
    password: document.getElementById("user_password").value
  };
  API.signup(newUser)
})

document.getElementById('btn-login').addEventListener('click', (event) => {
  const newUser = {
    email: document.getElementById("login_email").value,
    password: document.getElementById("login_password").value
  };
  API.login(newUser);
})

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
        localStorage.setItem("profileImg", response.data.profileImg);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("id", response.data._id);
        authenticated()
      })
      .catch(function (error) {
        console.log(error.response);
      })
  },
  login: function (newUser) {
    api.post("auth/login", newUser)
      .then(function (response) {
        if (response.data.error) {
          alert("YOSSS HACKER SAL DE AQUI")
        } else {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("profileImg", response.data.profileImg);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("id", response.data._id);
          console.log(response.data);
          authenticated()
        }
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }
}
function authenticated () {
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

document.getElementById('btn-signup').addEventListener('click', (event) => {
  const newUser = {
    name:     document.getElementById("user_name").value,
    username: document.getElementById("user_username").value,
    email:    document.getElementById("user_email").value,
    password: document.getElementById("user_password").value
  };

  api
    .post("auth/signup", newUser)
    .then(function (response) {
      localStorage.setItem("token",    response.data.token);
      localStorage.setItem("name",     response.data.name);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("email",    response.data.email);
    })
    .catch(function (error) {
      console.log(error.response);
    });
})

document.getElementById('btn-login').addEventListener('click', (event) => {

  const newUser = {
    email:    document.getElementById("login_email").value,
    password: document.getElementById("login_password").value
  };

  api
    .post("auth/login", newUser)
    .then(function (response) {
      if( response.data.error ) {
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
})

document.getElementById('btn-api').addEventListener('click', (event) => {
  api
    .get("whoami", { headers: { token: localStorage.getItem("token") }})
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error.response);
    });
})

authenticated();
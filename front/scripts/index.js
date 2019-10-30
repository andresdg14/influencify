function loadInfluencers() {

}

document.getElementById('btn-signup').addEventListener('click', (event) => {
  const newUser = {
    name:     document.getElementById("user_name").value,
    username: document.getElementById("user_username").value,
    email:    document.getElementById("user_email").value,
    password: document.getElementById("user_password").value
  };
  API.signup(newUser)
})

document.getElementById('btn-login').addEventListener('click', (event) => {
  const newUser = {
    email:    document.getElementById("login_email").value,
    password: document.getElementById("login_password").value
  };
  API.login(newUser);
})

document.getElementById('btn-api').addEventListener('click', (event) => {

})
document.addEventListener("DOMContentLoaded", function () {
  var array= API.getMyInfluencers().then(data => {
    data.forEach(wtf => {
      var ih = document.getElementById('influencers-home')
      ih.innerHTML(`<li>${wtf}</li>`)
    });
  })

  authenticated();
});


document.addEventListener("DOMContentLoaded", function () {
  const p = document.getElementById('username')
  p.innerHTML = localStorage.getItem("username");
})
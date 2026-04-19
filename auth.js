document.addEventListener("DOMContentLoaded", () => {
  const userIcon = document.getElementById("userIcon");
  const token = localStorage.getItem("token");

  if (token) {
    userIcon.className = "fa fa-user-circle";
  } else {
    userIcon.className = "fa fa-user";
  }
});

function handleUserIcon() {
  const token = localStorage.getItem("token");

  if (token) {
    window.location.href = "profile.html";
  } else {
    window.location.href = "login.html";
  }
}
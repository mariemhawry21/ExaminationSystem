const urlParams = new URLSearchParams(window.location.search);
const errorMsg = urlParams.get("error");
console.log(errorMsg);

document.querySelector(".error-msg").innerHTML = errorMsg

if (JSON.parse(localStorage.getItem("username"))) {
  document.querySelector(".LogIn").style.display = "none";
  document.querySelector(".profile").style.display = "flex";
}
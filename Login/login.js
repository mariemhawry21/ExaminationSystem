const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const errorEmail = document.querySelector(".errorEmail");
const errorPassword = document.querySelector(".errorPassword");
const btnLogin = document.querySelector(".btnLogin");
const errorButton = document.querySelector(".errorButton");

function validEmail() {
  const regExpressionEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!regExpressionEmail.test(emailInput.value)) {
    errorEmail.style.display = "block";
    return false;
  } else {
    errorEmail.style.display = "none";
    return true;
  }
}

function validPassword() {
  if (passwordInput.value.length < 8) {
    errorPassword.style.display = "block";
    return false;
  } else {
    errorPassword.style.display = "none";
    return true;
  }
}

let userFound = false;
function formSubmit(e) {
  e.preventDefault();

  let isFormValid = validEmail() && validPassword();

  if (isFormValid) {
    const user = JSON.parse(localStorage.getItem("email")) || "";

    const password = JSON.parse(localStorage.getItem("password")) || "";

    if (user === emailInput.value && password === passwordInput.value) {
      userFound = true;
    }
    if (userFound) {
      window.location.href = "../index.html";
      console.log("SUCCESS");
    } else {
      errorButton.style.display = "block";
      console.log("FAILLL");
    }
  }
}

btnLogin.addEventListener("click", formSubmit);

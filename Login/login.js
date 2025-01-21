const emailInput = document.getElementById("emailInput");
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

function formSubmit(e) {
  e.preventDefault(); 

  let isFormValid = validEmail() && validPassword(); 

  if (isFormValid) {
    const users = JSON.parse(localStorage.getItem("users")); 

    let userFound = false; 

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === emailInput.value && users[i].password === passwordInput.value) {
        userFound = true; 
        break; 
      }
    }

    if (userFound) {
      window.location.href = "home.html";
      console.log("SUCCESS"); 
    } else {
      errorButton.style.display = "block"; 
    }
  }
}

btnLogin.addEventListener("click", formSubmit);

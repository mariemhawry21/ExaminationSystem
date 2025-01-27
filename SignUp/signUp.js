const registrationForm = document.getElementById("registrationForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const agreePolicy = document.getElementById("agreePolicy");
const errorName = document.querySelector(".errorName");
const errorEmail = document.querySelector(".errorEmail");
const errorPassword = document.querySelector(".errorpassword");
const errorConfirmPassword = document.querySelector(".errorconfirmpassword");
const errorCheckbox = document.querySelector(".errorCheckbox");
const submitButton = document.querySelector(".btnSubmit");
const successMessage = document.querySelector(".SucessP");

function validFirstName() {
  const regExpressionName = /^[a-zA-Z]+$/;
  if (!regExpressionName.test(firstName.value)) {
    errorName.textContent = "First name can only contain letters.";
    errorName.style.display = "block";
    return 0;
  } else {
    errorName.style.display = "none";
    return 1;
  }
}

function validLastName() {
  const regExpressionName = /^[a-zA-Z]+$/;
  if (!regExpressionName.test(lastName.value)) {
    errorName.textContent = "Last name can only contain letters.";
    errorName.style.display = "block";
    return 0;
  } else {
    errorName.style.display = "none";
    return 1;
  }
}

function validEmail() {
  const regExpressionEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!regExpressionEmail.test(email.value)) {
    errorEmail.textContent = "Please enter a valid email address.";
    errorEmail.style.display = "block";
    return 0;
  } else {
    errorEmail.style.display = "none";
    return 1;
  }
}

function validPassword() {
  if (password.value.length < 8) {
    errorPassword.textContent = "Password must be at least 8 characters.";
    errorPassword.style.display = "block";
    return 0;
  } else {
    errorPassword.style.display = "none";
    return 1;
  }
}

function validConfirmPassword() {
  if (password.value !== confirmPassword.value) {
    errorConfirmPassword.textContent = "Passwords do not match.";
    errorConfirmPassword.style.display = "block";
    return 0;
  } else {
    errorConfirmPassword.style.display = "none";
    return 1;
  }
}

function validCheckbox() {
  if (!agreePolicy.checked) {
    errorCheckbox.textContent = "You must agree to the policy.";
    errorCheckbox.style.display = "block";
    return 0;
  } else {
    errorCheckbox.style.display = "none";
    return 1;
  }
}

firstName.addEventListener("input", validFirstName);
lastName.addEventListener("input", validLastName);
email.addEventListener("input", validEmail);
password.addEventListener("input", validPassword);
confirmPassword.addEventListener("input", validConfirmPassword);
agreePolicy.addEventListener("change", validCheckbox);

function FormSubmit(e) {
  e.preventDefault();

  let isFormValid =
    validFirstName() &&
    validLastName() &&
    validEmail() &&
    validPassword() &&
    validConfirmPassword() &&
    validCheckbox();

  if (isFormValid) {
    let users = JSON.parse(localStorage.getItem("username")) || [];
    // const findUser = users.find((user) => user.email === email.value);

    // if (findUser) {
    //   errorEmail.textContent = "An account with this email already exists.";
    //   errorEmail.style.display = "block";
    //   return 1;
    // }
    const newUser = {
      username: firstName.value + " " + lastName.value,
      email: email.value,
      password: password.value,
    };
    localStorage.setItem("username", JSON.stringify(newUser.username));
    localStorage.setItem("email", JSON.stringify(newUser.email));
    localStorage.setItem("password", JSON.stringify(newUser.password));
    localStorage.setItem("coursesCompleted", JSON.stringify([]));
    localStorage.setItem("coursesWaiting", JSON.stringify([]));

    successMessage.style.display = "block";
    setTimeout(() => {
      window.location.href = "../Login/login.html";
    }, 1000);
  }
}

submitButton.addEventListener("click", FormSubmit);

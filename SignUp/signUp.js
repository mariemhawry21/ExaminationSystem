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
const submitBottun = document.querySelector(".btnSubmit");
const SucessMessage = document.querySelector(".SucessP");


function validFirstName() {
    const regExpressionName = /^[a-zA-Z]+$/;
    if (!regExpressionName.test(firstName.value)) {
        errorName.style.display = "block";
        return 0;
    } else {
        errorName.style.display = "none";
        return 1;

    }    
}
function validLasttName() {
    const regExpressionName = /^[a-zA-Z]+$/;
    if (!regExpressionName.test(lastName.value)) {
        errorName.style.display = "block";
        return 0;
    } else {
        errorName.style.display = "none";
        return 1;

    }    
}  

function vaildEmail() {
    const regExpressionEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regExpressionEmail.test(email.value)) {
        errorEmail.style.display  ="block";
        return 0;
    }
    else
    {
        errorEmail.style.display  ="none";
        return 1;


    }       

}
function vaildPassword() {
    if (password.value.length < 8) {
        errorPassword.style.display="block" ;
        return 0;
 
    }
    {
        errorPassword.style.display="none"  ;
        return 1;


    }

    
}
function validConfirmPassword() {
    if (password.value !== confirmPassword.value) {
      errorConfirmPassword.style.display = "block";
      return 0;

    } else {
      errorConfirmPassword.style.display = "none";
      return 1;

    }
  }
  function validCheckbox() {
    if (!agreePolicy.checked) {
      errorCheckbox.style.display = "block";
      return 0;

     
    } else {
      errorCheckbox.style.display = "none";
      return 1;

      
    }
  }
  firstName.addEventListener("input", validFirstName);
    lastName.addEventListener("input", validLasttName);
    email.addEventListener("input", vaildEmail);
    password.addEventListener("input", vaildPassword);
    confirmPassword.addEventListener("input", validConfirmPassword);
    agreePolicy.addEventListener("change", validCheckbox);
  
  function FormSubmit(e) {
    e.preventDefault();

    let isFormValid =
    validFirstName() &&
    validLasttName() &&
    vaildEmail() &&
    vaildPassword() &&
    validConfirmPassword() &&
    validCheckbox();

    if (isFormValid) {
      localStorage.setItem("firstName", firstName.value);
      localStorage.setItem("lastName", lastName.value);
      localStorage.setItem("email", email.value);
      localStorage.setItem("password", password.value); 
      
      SucessMessage.style.display = "block";
      setTimeout(() => {
        window.location.href = "../Login/login.html";

      }, 1000);

  }
}
submitBottun.addEventListener("click" , FormSubmit)   
  

    function loadFormData() {
      const storedFirstName = localStorage.getItem("firstName");
      const storedLastName = localStorage.getItem("lastName");
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");

  
      if (storedFirstName) {
        firstName.value = storedFirstName;
      }
      if (storedLastName) {
        lastName.value = storedLastName;
      }
      if (storedEmail) {
        email.value = storedEmail;
      }
      if (storedPassword) {
        password.value = storedPassword;
      }
    }
  
    loadFormData();
  
    
  
  
let [firstName, lastName] = JSON.parse(
  localStorage.getItem("username") || '""'
).split(" ");
let email = JSON.parse(localStorage.getItem("email") || '""');
let image = JSON.parse(localStorage.getItem("image")) || "";

let firstNameInput = document.getElementById("firstName");
let lastNameInput = document.getElementById("lastName");
let emailInput = document.getElementById("email");
let profilePictureInput = document.getElementById("profilePicture");
let saveChangesBtn = document.querySelector(".saveChangesBtn");

firstNameInput.value = firstName || "";
lastNameInput.value = lastName || "";
emailInput.value = email || "";

// Validation helper functions
function validateName(name) {
  const nameRegex = /^[A-Za-z]+$/;
  return nameRegex.test(name.trim());
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

function validateImage(fileInput) {
  if (!fileInput.files.length) return true; // Image is optional
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  return allowedTypes.includes(fileInput.files[0].type);
}

// Event listener for Save Changes button
saveChangesBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const firstNameValue = firstNameInput.value.trim();
  const lastNameValue = lastNameInput.value.trim();
  const emailValue = emailInput.value.trim();

  // Validation checks
  if (!validateName(firstNameValue)) {
    alert("Please enter a valid first name (only alphabetic characters).");
    return;
  }

  if (!validateName(lastNameValue)) {
    alert("Please enter a valid last name (only alphabetic characters).");
    return;
  }

  if (!validateEmail(emailValue)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!validateImage(profilePictureInput)) {
    alert("Please upload a valid image file (JPEG or PNG).");
    return;
  }

  // Save data to localStorage
  const username = `${firstNameValue} ${lastNameValue}`;
  localStorage.setItem("username", JSON.stringify(username));
  localStorage.setItem("email", JSON.stringify(emailValue));

  if (profilePictureInput.files.length) {
    const reader = new FileReader();
    reader.onload = function () {
      localStorage.setItem("image", JSON.stringify(reader.result));
    };
    reader.readAsDataURL(profilePictureInput.files[0]);
  }
  // history.replaceState(null, null, window.location.href);
  history.replaceState(null, null, window.location.pathname);


  location.href = "./profile.html";
});

const urlParams = new URLSearchParams(window.location.search);
const errorMsg = urlParams.get("error");
console.log(errorMsg);

document.querySelector(".error-msg").innerHTML=errorMsg
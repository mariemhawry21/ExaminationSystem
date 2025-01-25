const urlParams = new URLSearchParams(window.location.search);
const ques = urlParams.get("numberOfQuestions");
const Score = urlParams.get("score");
let resultPara = document.querySelector(".result");
resultPara.innerHTML = (parseInt(Score) * 100) / parseInt(ques);

const username = localStorage.getItem("username");
document.getElementById("username").textContent = username;
console.log(username);

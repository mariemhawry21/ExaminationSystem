const urlParams = new URLSearchParams(window.location.search);

const Score = urlParams.get("score");
const ques =urlParams.get("numberOfQuestions");

console.log(Score);
console.log(ques);



let resultPara = document.querySelector(".result");
resultPara.innerHTML = parseInt(Score)*100 / parseInt(ques);


const username = localStorage.getItem("username");
document.getElementById("username").textContent = username;
  console.log(username);
  
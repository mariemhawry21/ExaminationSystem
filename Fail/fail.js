const urlParams = new URLSearchParams(window.location.search);
const ques = urlParams.get("numberOfQuestions");
const Score = urlParams.get("score");
const course = urlParams.get("courseName");
const Level = urlParams.get("level");

let resultPara = document.querySelector(".result");
resultPara.innerHTML = (parseInt(Score) * 100) / parseInt(ques);

const username = JSON.parse(localStorage.getItem("users"))[0].username;
document.getElementById("username").textContent = username;
document.querySelector(".try-btn").addEventListener("click", (e) => {
  location.href = `../Exam/exam.html?course=${course}&level=${encodeURIComponent(
    Level
  )}`;
});

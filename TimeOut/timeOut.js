const username = JSON.parse(localStorage.getItem("username"));
document.getElementById("username").textContent = username;


const course = urlParams.get("courseName");
const Level = urlParams.get("level");

document.querySelector(".try-btn").addEventListener("click", (e) => {
    location.href = `../Exam/exam.html?course=${course}&level=${encodeURIComponent(
      Level
    )}`;
  });
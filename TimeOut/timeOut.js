const urlParams = new URLSearchParams(window.location.search);

const username = JSON.parse(localStorage.getItem("username"));
document.getElementById("username").textContent = username;

const course = urlParams.get("courseName");
const Level = urlParams.get("level");

document.querySelector(".try-btn").addEventListener("click", (e) => {
  console.log("ttime out");

  location.href = `../Exam/exam.html?course=${course}&level=${encodeURIComponent(
    Level
  )}`;
});

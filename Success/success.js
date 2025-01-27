const urlParams = new URLSearchParams(window.location.search);

const Score = urlParams.get("score");
const ques = urlParams.get("numberOfQuestions");
const course = urlParams.get("courseName");
const Level = urlParams.get("level");

console.log(Score);
console.log(ques);

let resultPara = document.querySelector(".result");
resultPara.innerHTML = (parseInt(Score) * 100) / parseInt(ques);

const username = JSON.parse(localStorage.getItem("username"));
document.getElementById("username").textContent = username;
console.log(username);

const courseData = {
  courseName: course,
  degree: Score,
  level: Level,
};

let courses = JSON.parse(localStorage.getItem("coursesCompleted")) || [];

courses.push(courseData);
console.log(courses);

localStorage.setItem("coursesCompleted", JSON.stringify(courses));

const urlParams = new URLSearchParams(window.location.search);

const Score = urlParams.get("score");
const ques = urlParams.get("numberOfQuestions");

console.log(Score);
console.log(ques);

let resultPara = document.querySelector(".result");
resultPara.innerHTML = (parseInt(Score) * 100) / parseInt(ques);

const username = JSON.parse(localStorage.getItem("users"))[0].username;
document.getElementById("username").textContent = username;
console.log(username);

const courseData = {
  courseName: courseName,
  degree: Score,
};

let courses = JSON.parse(localStorage.getItem("courses")) || [];

courses.push(courseData);

localStorage.setItem("courses", JSON.stringify(courses));

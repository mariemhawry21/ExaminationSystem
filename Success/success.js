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
  numberOfQuestions: ques,
};

let courses = JSON.parse(localStorage.getItem("coursesCompleted")) || [];

const existingCourseIndex = courses.findIndex(
  (el) => el.courseName === course && el.level === Level
);

if (existingCourseIndex !== -1) {
  const existingCourse = courses[existingCourseIndex];
  if (
    parseInt(existingCourse.degree) !== parseInt(Score) &&
    existingCourse.level === Level
  ) {
    courses[existingCourseIndex] = courseData;
    console.log("Course updated at the same level:", courseData);
  } else {
    console.log("No changes detected. Course not updated.");
  }
} else {
  courses.push(courseData);
  console.log("New course added:", courseData);
}

localStorage.setItem("coursesCompleted", JSON.stringify(courses));

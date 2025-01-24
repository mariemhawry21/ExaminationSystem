let examContainer = document.getElementById("exams");

async function getData() {
  const url = "./examQues.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    showCourses(json);
  } catch (error) {
    console.error(error.message);
  }
}
getData();
const icons = [
  "fab fa-html5",
  "fab fa-css3-alt",
  "fab fa-js",
  "fab fa-angular",
  "fab fa-node",
  "fab fa-react",
];

function showCourses(courses) {
  Object.keys(courses).forEach((courseName, i) => {
    let courseCard = `
            <div class="course-card col-12 col-md-6 col-lg-4">
            <div><i class="${icons[i]} icon-card"></i></div>
                <h2>${courseName}</h2> 
                <button onclick="takeExam('${courseName}')">Take Exam</button>
            </div>
        `;
    examContainer.innerHTML += courseCard;
  });
}

function takeExam(courseName) {
  console.log(courseName);
  //check if he logged
  location.href = `./Exam/start.html?course=${encodeURIComponent(courseName)}`;
  //else go to login page
}


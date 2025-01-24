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
  "fab fa-react"
];


function showCourses(courses) {
  Object.keys(courses).forEach((courseName) => {
    
    let courseCard = `
            <div class="course-card">
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







function toggleDropdown() {
  const dropdownContent = document.querySelector(".dropdown-content");
  const dropdownBtn = document.querySelector(".dropdown-btn span");

  dropdownContent.classList.toggle("show");

  dropdownBtn.classList.toggle("rotate");
}


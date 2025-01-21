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

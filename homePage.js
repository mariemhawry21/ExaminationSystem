let frontContainer = document.getElementById("exams");
let uiContainer = document.getElementById("exams-ui");
let backContainer = document.getElementById("exams-back");

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
  console.log(Object.entries(courses));

  Object.keys(courses).forEach((courseName, i) => {
    let courseCard = `
            <div class="course-card col-12 col-md-6 col-lg-4 p-0">
            <div class="bg-white p-3"style="height:200px" ><img src="${courses[courseName]["image"]}" class="img-fluid" style="height:100%"/></div>
            <div class="p-3">
                <h2>${courseName}</h2> 
                <button class="fw-bold"  onclick="takeExam('${courseName}')">Take Exam</button>
                <button class="fw-bold add-btn" onclick="addToWaiting('${courseName}','${courses[courseName]["image"]}')">Add To Waiting List</button>
                </div>
            </div>
        `;
    if (courses[courseName]["category"] == "Front-End") {
      frontContainer.innerHTML += courseCard;
    } else if (courses[courseName]["category"] == "Back-End") {
      backContainer.innerHTML += courseCard;
    } else {
      uiContainer.innerHTML += courseCard;
    }
  });
}

if (JSON.parse(localStorage.getItem("username"))) {
  document.querySelector(".LogIn").style.display = "none";
  document.querySelector(".profile").style.display = "flex";
}

function takeExam(courseName) {
  console.log(courseName);
  //check if he logged
  if (JSON.parse(localStorage.getItem("username"))) {
    location.href = `./Exam/start.html?course=${encodeURIComponent(
      courseName
    )}`;
  } else {
    location.href = `./Login/login.html`;
  }
  //else go to login page
}

function addToWaiting(courseName, url) {
  let waitingCourses = JSON.parse(localStorage.getItem("coursesWaiting")) || [];

  // Check if the course is already in the waiting list
  const courseIndex = waitingCourses.findIndex(
    (course) => course.courseName === courseName
  );

  if (courseIndex === -1) {
    waitingCourses.push({
      courseName: courseName,
      image: url,
    });
    localStorage.setItem("coursesWaiting", JSON.stringify(waitingCourses));
    updateButtonText(courseName, "Remove from Waiting");
  } else {
    // If already in the list, remove it
    waitingCourses.splice(courseIndex, 1);
    localStorage.setItem("coursesWaiting", JSON.stringify(waitingCourses));
    updateButtonText(courseName, "Add to Waiting");
  }
}

function updateButtonText(courseName, text) {
  const buttons = document.querySelectorAll(".add-btn");
  buttons.forEach((button) => {
    if (button.getAttribute("onclick").includes(courseName)) {
      button.innerHTML = text;
    }
  });
}
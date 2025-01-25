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

const urlParams = new URLSearchParams(window.location.search);

const logged = urlParams.get("logged");
if (JSON.parse(localStorage.getItem("users"))[0].username) {
  document.querySelector(".LogIn").style.display = "none";
  document.querySelector(".profile").style.display = "flex";
}


function takeExam(courseName) {
  console.log(courseName);
  //check if he logged
  if (JSON.parse(localStorage.getItem("users"))[0].username) {
    location.href = `./Exam/start.html?course=${encodeURIComponent(
      courseName
    )}`;
  } else {
    location.href = `./Login/login.html`;
  }
  //else go to login page
}

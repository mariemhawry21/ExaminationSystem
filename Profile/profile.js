const profilePictureInput = document.getElementById("profilePicture");
const navbarProfilePic = document.getElementById("navbarProfilePic");
const saveChangesBtn = document.getElementsByClassName("saveChangesBtn");

const namepara = document.querySelector(".name");
const emailpara = document.querySelector(".email");

let username = JSON.parse(localStorage.getItem("username"));
namepara.innerHTML = username;

let useremail = JSON.parse(localStorage.getItem("email"));
emailpara.innerHTML = useremail;

let coursesCompleted = JSON.parse(localStorage.getItem("coursesCompleted"));
let coursesWaiting = JSON.parse(localStorage.getItem("coursesWaiting"));

const completedContainer = document.getElementById("completed-tab-pane");
const waitingContainer = document.getElementById("waiting-tab-pane");

let image = JSON.parse(localStorage.getItem("image")) || "";
if (image) {
  let imgcontainer = document.querySelector(".image");
  let iconcontainer = document.querySelector(".profile-icon");
  iconcontainer.style.display = "none";
  imgcontainer.innerHTML = `<img src=${image} class="img-fluid profilePic" alt="profilePhoto"/>`;
}

console.log(coursesCompleted.length);
if (coursesCompleted.length === 0) {
  completedContainer.innerHTML = "<p> no completed courses </p>";
} else {
  completedContainer.innerHTML = "";
  coursesCompleted.forEach((el) => {
    const percentage = (el.degree / el.numberOfQuestions) * 100;
    let stars = "";

    if (percentage >= 90) {
      stars = "★★★★★";
    } else if (percentage >= 70) {
      stars = "★★★★☆";
    } else if (percentage >= 50) {
      stars = "★★★☆☆";
    } else if (percentage >= 30) {
      stars = "★★☆☆☆";
    } else {
      stars = "★☆☆☆☆";
    }
    completedContainer.innerHTML += `
      <div class="card mb-3" >
  <div class="row g-0">
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${el.courseName}</h5>
        <p class="card-text"><small class="text-body-secondary">level: ${el.level}</small></p>
        <p class="card-text">you get ${el.degree} out of ${el.numberOfQuestions}</p>
       <p>${stars}</p>
      </div>
    </div>
  </div>
</div>
`;
  });
}

// // i check if there is any course completed still exist in waiting list
// coursesWaiting = coursesWaiting.filter(
//   (waitingCourse) =>
//     !coursesCompleted.some(
//       (completedCourse) =>
//         completedCourse.courseName === waitingCourse.courseName
//     )
// );
// localStorage.setItem("coursesWaiting", JSON.stringify(coursesWaiting));

if (coursesWaiting.length === 0) {
  waitingContainer.innerHTML = "<p> no waiting courses </p>";
} else {
  waitingContainer.innerHTML = "";
  coursesWaiting.forEach((el) => {
    waitingContainer.innerHTML += `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0  align-items-center">
    <div class="col-md-4" style="height:100px">
      <img src=".${el.image}" class="img-fluid rounded-start p-2"  style="height:100%; object-fit:contain" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body d-flex justify-content-between align-items-center">
        <h5 class="card-title">${el.courseName}</h5>
        <button class="removeBtn" onclick="removeFromList('${el.courseName}')" style="width:100px">Remove</button>
      </div>
    </div>
  </div>
</div>`;
  });
}

function removeFromList(course) {
  let filteredData = coursesWaiting.filter((el) => el.courseName !== course);
  coursesWaiting = filteredData;
  localStorage.setItem("coursesWaiting", JSON.stringify(coursesWaiting));
  displayData(filteredData);
}
function displayData(data) {
  waitingContainer.innerHTML = "";
  if (data.length === 0) {
    waitingContainer.innerHTML = "<p> no waiting courses </p>";
  }
  data.forEach((el) => {
    waitingContainer.innerHTML += `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4" style="height:100px">
      <img src=".${el.image}" class="img-fluid rounded-start p-2"  style="height:100%; object-fit:contain" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body d-flex justify-content-between">
        <h5 class="card-tiئtle">${el.courseName}</h5>
        <button class="removeBtn"onclick="removeFromList('${el.courseName}')" style="width:100px">Remove</button>
      </div>
    </div>
  </div>
</div>`;
  });
}

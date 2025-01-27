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

console.log(coursesCompleted.length);
if (coursesCompleted.length === 0) {
  completedContainer.innerHTML = "<p> no completed courses </p>";
} else {
    completedContainer.innerHTML=""
    coursesCompleted.forEach((el) => {
        completedContainer.innerHTML += `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="..." class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${el.courseName}</h5>
        <p class="card-text">${el.level}</p>
        <p class="card-text"><small class="text-body-secondary">${el.degree}</small></p>
      </div>
    </div>
  </div>
</div>`;
    })
}
if (coursesWaiting.length === 0) {
  waitingContainer.innerHTML = "<p> no waiting courses </p>";
} else {
    waitingContainer.innerHTML=""
    coursesWaiting.forEach((el) => {
        waitingContainer.innerHTML += `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4" style="height:100px">
      <img src=".${el.image}" class="img-fluid rounded-start p-2"  style="height:100%; object-fit:contain" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${el.courseName}</h5>
        <p class="card-text"><small class="text-body-secondary">${el.degree}</small></p>
      </div>
    </div>
  </div>
</div>`;
    })
}


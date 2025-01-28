const urlParams = new URLSearchParams(window.location.search);
const courseName = urlParams.get("course");

console.log(courseName);

let par = document.querySelector("span");
if (par) {
  par.innerHTML = courseName;
}

let levelBtns = document.querySelectorAll(".level-btn");

let choosedlevel;
if (levelBtns) {
  levelBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log(e.target.innerText);
      choosedlevel = e.target.innerHTML;
      levelBtns.forEach((el) => {
        el.classList.remove("active");
      });
      btn.classList.add("active");
    });
  });
}
function checkTheChoosedLevel() {
  if (!choosedlevel) {
    document.querySelector(".error-select").style.visibility = "visible";
    return false;
  } else {
    document.querySelector(".error-select").style.visibility = "hidden";
    return true;
  }
}

let startExamBtn = document.querySelector(".startExam");
if (startExamBtn) {
  startExamBtn.addEventListener("click", (e) => {
    if (checkTheChoosedLevel()) {
      location.href = `./exam.html?course=${courseName}&level=${encodeURIComponent(
        choosedlevel
      )}`;
    }
  });
}

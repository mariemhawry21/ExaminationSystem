const urlParams = new URLSearchParams(window.location.search);
const courseName = urlParams.get("course");

console.log(courseName);

let par = document.querySelector("p");
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

let startExamBtn = document.querySelector(".startExam");
if (startExamBtn) {
  startExamBtn.addEventListener("click", (e) => {
    location.href = `./exam.html?course=${encodeURIComponent(
      courseName
    )}&level=${encodeURIComponent(choosedlevel)}`;
  });
}

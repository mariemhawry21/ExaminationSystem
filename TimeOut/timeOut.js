const username = JSON.parse(localStorage.getItem("users"))[0].username;
document.getElementById("username").textContent = username;

document.querySelector(".try-btn").addEventListener("click", (e) => {
    location.href = `../Exam/exam.html?course=${course}&level=${encodeURIComponent(
      Level
    )}`;
  });
import Question from "../Questions/questionsClass.js";

const urlParams = new URLSearchParams(window.location.search);
const courseName = urlParams.get("course");
const choosedLevel = urlParams.get("level").toLowerCase();

let userSelections = [];
let flaggedQuestions = [];
let data = null;
let courseQuestion;
let length;

async function fetchExamQuestions() {
  console.log("fectching data");
  const url = "../examQues.json";
  toggleLoading(true);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    data = await response.json();
    let jsonQuestion = data[courseName][choosedLevel];

    courseQuestion = jsonQuestion.map((el) => {
      return new Question(el.question, el.options, el.answer);
    });

    courseQuestion = Question.shuffleArray(courseQuestion);

    console.log(courseQuestion);

    if (!courseQuestion || courseQuestion.length === 0) {
      throw new Error(
        "No questions available for the selected course or level."
      );
    }

    console.log("data", data);
    length = courseQuestion.length;

    showQuestions();
  } catch (error) {
    console.error(error.message);
    location.href = `../Error/error.html?error=${encodeURIComponent(
      error.message
    )}`;
    displayErrorMessage(error.message);
  } finally {
    toggleLoading(false);
  }
}

fetchExamQuestions();

let cnt = 0;

function showQuestions() {
  const questionContainer = document.querySelector(".qeuestion");
  const question = courseQuestion[cnt];

  console.log("question", question);

  if (question) {
    const questionCard = `
        <div class="question-card">
        <div class="d-flex justify-content-between align-items-center">
          <h3>${question.question}</h3>
          <p><i class="fa-regular fa-flag theFlag ${
            flaggedQuestions.includes(cnt) ? "fa-solid" : "fa-regular"
          } "></i></p>
</div>
          <ul class="list-unstyled">
            ${question.options
              .map(
                (option, idx) =>
                  `<li class="m-2 option-item ${
                    userSelections[cnt] === option ? "selected" : ""
                  }" >
                  <input type="radio" name="question" value="${escapeHTML(
                    option
                  )}" id="option${idx}" ${
                    userSelections[cnt] === option ? "checked" : ""
                  }>
                  <label for="option${idx}">${escapeHTML(option)}</label>
                </li>`
              )
              .join("")}
          </ul>
          <p class="plese-select-para"></p>
          <div class="d-flex justify-content-between">
           <div class="">
          <button id="prevQuestion" style="width:100px" class=" fw-bold  text-uppercase  p-2 rounded " onclick="getPrevQuestion()">Prev</button>
          </div>
        
          <div class="numbersDiv">
          
          <p class="QuestionNumber ${cnt == length - 1 ? "complete" : ""}">${
      cnt + 1
    }</p> of <p class="numberOfQuestions">${length}</p></div>
           <div class="">
          ${
            cnt === length - 1
              ? `<button id="submitBTN" style="width:100px" class=" fw-bold text-white text-uppercase border-0 p-2 rounded" onclick="submitQuiz()">Submit</button>`
              : `<button id="nextQuestion" style="width:100px" class=" fw-bold text-white text-uppercase border-0 p-2 rounded" onclick="getNextQuestion()">Next</button>`
          }
          </div>
          </div>
        </div>
      `;
    questionContainer.innerHTML = questionCard;

    //add listeners to lis to handle the color change
    document.querySelectorAll(".option-item").forEach((item) => {
      item.addEventListener("click", function () {
        const radio = this.querySelector("input[type='radio']");
        if (radio) {
          radio.checked = true;
          console.log("changed", radio.value);

          document.querySelectorAll(".option-item").forEach((el) => {
            el.classList.remove("selected");
          });

          this.classList.add("selected");
        }
      });
    });
    document.querySelector(".theFlag").addEventListener("click", handleFlag);
  }
}

/**
 * function escapeHTML
 * Description  function that convert choices that it html tag to text
 * to ensure every thing is rendered in document as text
 *
 * @param {htmltag} text
 * @returns {text}
 */
function escapeHTML(text) {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}

function getNextQuestion() {
  const selectedOption = document.querySelector(
    'input[name="question"]:checked'
  );
  let nextBtn = document.querySelector("#nextQuestion");
  if (!selectedOption) {
    showError("Please select an option before moving to the next question.");
    return;
  }
  userSelections[cnt] = selectedOption.value;

  console.log(userSelections);
  if (cnt < length - 1) {
    cnt++;
    console.log(cnt);
    nextBtn.disabled = false;
    showQuestions();
  } else {
    document.querySelector("#submitBTN").style.display = "block";
  }
}

function getPrevQuestion() {
  let prevBtn = document.querySelector("#prevQuestion");
  if (cnt > 0) {
    cnt--;
    console.log(cnt);
    prevBtn.disabled = false;
    showQuestions();
  } else {
    prevBtn.disabled = true;
  }
}

//handle loading for fetching
function toggleLoading(show) {
  const loadingElements = document.querySelectorAll(".loading");
  console.log(loadingElements);

  loadingElements.forEach((loadingElement) => {
    loadingElement.style.display = show ? "block" : "none";
  });
}

//error function when fetching
function displayErrorMessage(message) {
  const questionContainer = document.querySelector(".qeuestion");
  questionContainer.innerHTML = `<p class="error-message">${message}</p>`;
}

//error function for the required questions
function showError(message) {
  const errorContainer = document.querySelector(".error-message");
  if (!errorContainer) {
    const errorElement = document.createElement("p");
    errorElement.style.color = "red";
    errorElement.textContent = message;
    document.querySelector(".plese-select-para").innerHTML = "";
    document.querySelector(".plese-select-para").appendChild(errorElement);
  }
}

// Total time in seconds

let totalTime = localStorage.getItem("remainingTime")
  ? parseInt(localStorage.getItem("remainingTime"), 10)
  : 300;

function startTimer() {
  const timerElement = document.getElementById("timeRemaining");

  const timerInterval = setInterval(() => {
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;

    timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    totalTime--;
    localStorage.setItem("remainingTime", totalTime);

    if (totalTime < 150) {
      timerElement.style.color = "red";
    }

    if (totalTime < 0) {
      clearInterval(timerInterval);
      localStorage.removeItem("remainingTime");
      TimeOut();
    }
  }, 1000);
}

// Handle time OUT logic
function TimeOut() {
  location.href = `../TimeOut/timeOut.html?level=${choosedLevel}&courseName=${courseName}`;
}

// Start the timer when the page loads or quiz starts
window.onload = function () {
  startTimer();
};

let score = 0;

function submitQuiz() {
  console.log(courseQuestion);

  localStorage.removeItem("remainingTime");

  courseQuestion.forEach((el, i) => {
    if (el.answer == userSelections[i]) {
      score++;
    }
  });
  console.log("course Ques", courseQuestion);
  console.log("selcted answer ", userSelections);
  console.log("score is", score);
  if (score >= length / 2) {
    location.href = `../Success/success.html?score=${score}&numberOfQuestions=${length}&level=${choosedLevel}&courseName=${courseName}`;
  } else {
    location.href = `../Fail/fail.html?score=${score}&numberOfQuestions=${length}&level=${choosedLevel}&courseName=${courseName}`;
  }
}
//add functions globaly so that can be seen if he element still not rendered in html yet
window.submitQuiz = submitQuiz;
window.getNextQuestion = getNextQuestion;
window.getPrevQuestion = getPrevQuestion;

window.addEventListener("error", function () {
  window.location.href = "../Error/error.html"; // Redirect to error page
});


function handleFlag() {
  console.log("flagged");
  const flagIcon = document.querySelector(".theFlag");

  if (flaggedQuestions.includes(cnt)) {
    // Remove from flagged list
    flaggedQuestions = flaggedQuestions.filter((index) => index !== cnt);
    flagIcon.classList.remove("fa-solid");
    flagIcon.classList.add("fa-regular");
  } else {
    // Add to flagged list
    flaggedQuestions.push(cnt);
    flagIcon.classList.remove("fa-regular");
    flagIcon.classList.add("fa-solid");
  }
  updateFlaggedContainer();
}
function updateFlaggedContainer() {
  const flaggedContainer = document.querySelector(".flag-container");
  flaggedContainer.innerHTML = "";
  if (flaggedQuestions.length === 0) {
    flaggedContainer.innerHTML = "no flagged questions";
    return;
  }

  flaggedQuestions.forEach((index) => {
    const button = document.createElement("button");
    button.textContent = `Q ${index + 1}`;
    button.classList.add("flagged-item");
    button.addEventListener("click", () => goToFlaggedQuestion(index));
    flaggedContainer.appendChild(button);
  });
}
function goToFlaggedQuestion(index) {
  cnt = index;
  showQuestions();
}

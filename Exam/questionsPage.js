const urlParams = new URLSearchParams(window.location.search);

const courseName = urlParams.get("course");
const choosedLevel = urlParams.get("level").toLowerCase();

let userSelections = [];

let data = null;
let lengthofQuestios = 0;

let courseQuestion;

console.log(courseName);
console.log(choosedLevel);
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
    courseQuestion = data[courseName][choosedLevel];

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
    displayErrorMessage(error.message);
  } finally {
    toggleLoading(false);
  }
}

fetchExamQuestions();
let cnt = 0;

function showQuestions() {
  const questions = data[courseName][choosedLevel];
  const questionContainer = document.querySelector(".qeuestion");
  const question = questions[cnt];

  console.log(question);

  if (question) {
    const questionCard = `
        <div class="question-card">
          <p>${question.question}</p>
          <ul>
            ${question.options
              .map(
                (option, idx) =>
                  `<li>
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
          <button id="submitBTN" onclick="submitQuiz()">Submit</button>
          <button id="nextQuestion" onclick="getNextQuestion()">Next</button>
          <button id="prevQuestion" onclick="getPrevQuestion()">Prev</button>
        </div>
      `;
    questionContainer.innerHTML = questionCard;
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

  if (cnt < length - 1) {
    cnt++;
    console.log(cnt);
    nextBtn.disabled = false;

    showQuestions();
  } else {
    nextBtn.style.display = "none";
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
  const loadingElement = document.querySelector(".loading");
  loadingElement.style.display = show ? "block" : "none";
}

//error function when fetching
function displayErrorMessage(message) {
  const questionContainer = document.querySelector(".question");
  questionContainer.innerHTML = `<p class="error-message">${message}</p>`;
}

//error function for the required questions
function showError(message) {
  const errorContainer = document.querySelector(".error-message");
  if (!errorContainer) {
    const errorElement = document.createElement("p");
    errorElement.style.color = "red";
    errorElement.textContent = message;
    document.querySelector(".qeuestion").appendChild(errorElement);
  }
}

let totalTime = 300; // Total time in seconds

function startTimer() {
  const timerElement = document.getElementById("timeRemaining");

  const timerInterval = setInterval(() => {
    // Calculate minutes and seconds
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;

    timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    totalTime--;
    if (totalTime < 150) {
      timerElement.style.color = "red";
    }

    if (totalTime < 0) {
      clearInterval(timerInterval);
      TimeOut();
    }
  }, 1000);
}

// Handle time OUT logic
function TimeOut() {
  location.href = "../TimeOut/timeOut.html";
}

// Start the timer when the page loads or quiz starts
window.onload = function () {
  startTimer();
};

let score = 0;

function submitQuiz() {
  console.log(courseQuestion);
  courseQuestion.forEach((el, i) => {
    if (el.answer == userSelections[i]) {
      score++;
    }
  });
  console.log(courseQuestion);
  console.log(userSelections);
  console.log(score);
  if (score >= length / 2) {
    location.href = `../Success/success.html?score=${score}`;
  } else {
    location.href = `../Fail/fail.html?score=${score}`;
  }
}

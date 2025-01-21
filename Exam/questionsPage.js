const urlParams = new URLSearchParams(window.location.search);

const courseName = urlParams.get("course");
const choosedLevel = urlParams.get("level").toLowerCase();

let data = null;
let lengthofQuestios = 0;

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
    const questions = data[courseName][choosedLevel];

    if (!questions || questions.length === 0) {
      throw new Error(
        "No questions available for the selected course or level."
      );
    }

    console.log("data", data);
    length = questions.length;
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
                  )}" id="option${idx}">
                  <label for="option${idx}">${escapeHTML(option)}</label>
                </li>`
              )
              .join("")}
          </ul>
          <button id="nextQuestion" onclick="getNextQuestion()">Next</button>
          <button id="prevQuestion" onclick="getPrevQuestion()">Prev</button>
        </div>
      `;
    questionContainer.innerHTML = questionCard;
  }
}

function escapeHTML(text) {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}
function getNextQuestion() {
  let nextBtn = document.querySelector("#nextQuestion");

  if (cnt < length) {
    cnt++;
    console.log(cnt);
    nextBtn.disabled = false;

    showQuestions();
  } else {
    nextBtn.disabled = true;
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

function toggleLoading(show) {
  const loadingElement = document.querySelector(".loading");
  loadingElement.style.display = show ? "block" : "none";
}

function displayErrorMessage(message) {
  const questionContainer = document.querySelector(".question");
  questionContainer.innerHTML = `<p class="error-message">${message}</p>`;
}

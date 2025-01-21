const urlParams = new URLSearchParams(window.location.search);

const courseName = urlParams.get("course");
const choosedLevel = urlParams.get("level");

console.log(courseName);
console.log(choosedLevel);

async function fetchExamQuestions() {
  console.log("fectching data");
  const url = "../examQues.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("data", json);
    showQuestions(json, courseName, choosedLevel.toLocaleLowerCase());
  } catch (error) {
    console.error(error.message);
  }
}

fetchExamQuestions();

function showQuestions(data, course, level) {
  let questions = data[course][level];
  console.log(data[course][level]);
}

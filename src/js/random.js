import { addToHistory } from "./history.js";
import { getId, onLoad } from "./shared.js";

onLoad();
const classId = getId();
const back = document.querySelector("header > nav > a");
const main = document.querySelector("main");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
let students = [];
let index = 0;

back.href = `class.html?id=${classId}&back=true`;

chrome.storage.sync.get(
  ["history", "studentsByClassId"],
  function ({ history, studentsByClassId }) {
    // History could be for another page, so we need to check
    // if we have the correct data first
    if (history && history.data && history.data.students) {
      students = history.data.students;
      index = history.data.index;
    } else {
      const studentsById = studentsByClassId[classId];
      for (const id in studentsById) {
        students.push(studentsById[id]);
      }
      students = shuffle(students);
    }
    renderCurrent();
  }
);

function renderCurrent() {
  // Add current state to history before rendering
  addToHistory({ students, index });
  main.textContent = students[index];
}

// Taken from https://stackoverflow.com/a/6274398/8486161
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

function prev() {
  index--;
  if (index < 0) {
    index = students.length - 1;
    students = shuffle(students);
  }
  renderCurrent();
}

function next() {
  index++;
  if (index > students.length - 1) {
    index = 0;
    students = shuffle(students);
  }
  renderCurrent();
}

prevButton.addEventListener("click", prev);
nextButton.addEventListener("click", next);

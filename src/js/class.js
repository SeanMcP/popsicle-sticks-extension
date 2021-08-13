import { cloneObj, getId, onLoad } from "./shared.js";

onLoad();
const classId = getId();
let heading = document.querySelector("header > h1");
let studentCount = document.getElementById("student-count");
let studentNameInput = document.getElementById("name-input");
let deleteClassButton = document.getElementById("delete-button");
let studentList = document.getElementById("student-list");
let randomLink = document.getElementById("random-link");

const bulkLink = document.getElementById("bulk-link");
bulkLink.href = bulkLink.href + "?id=" + classId;

chrome.storage.sync.get("classes", function (result) {
  heading.textContent = result.classes[classId];
});

function addStudent(event) {
  event.preventDefault();
  if (studentNameInput.value) {
    chrome.storage.sync.get("studentsByClassId", function (result) {
      let studentsByClassId = cloneObj(result.studentsByClassId);

      let studentId = new Date().getTime();
      if (!studentsByClassId[classId]) {
        studentsByClassId[classId] = {};
      }
      studentsByClassId[classId][studentId] = studentNameInput.value;

      chrome.storage.sync.set(
        {
          studentsByClassId: studentsByClassId,
        },
        function () {
          studentNameInput.value = "";
          renderStudents();
        }
      );
    });
  }
}

function deleteStudent(id) {
  chrome.storage.sync.get(["studentsByClassId"], function (result) {
    let studentsByClassId = cloneObj(result.studentsByClassId);
    delete studentsByClassId[classId][id];

    chrome.storage.sync.set(
      {
        studentsByClassId: studentsByClassId,
      },
      function () {
        renderStudents();
      }
    );
  });
}

function deleteClass() {
  chrome.storage.sync.get(["classes", "studentsByClassId"], function (result) {
    const classes = cloneObj(result.classes);
    delete classes[classId];

    const studentsByClassId = cloneObj(result.studentsByClassId);
    delete studentsByClassId[classId];

    chrome.storage.sync.set(
      {
        classes: classes,
        history: null,
        studentsByClassId: studentsByClassId,
      },
      function () {
        document.location = "home.html";
      }
    );
  });
}

function renderStudents() {
  while (studentList.firstChild) {
    studentList.removeChild(studentList.firstChild);
  }
  chrome.storage.sync.get(["classes", "studentsByClassId"], function (result) {
    let students = result.studentsByClassId[classId];
    let count = 0;
    if (students && Object.keys(students).length) {
      Object.keys(students).forEach(function (id) {
        let li = document.createElement("li");
        let span = document.createElement("span");
        span.textContent = students[id];
        li.appendChild(span);

        let button = document.createElement("button");
        button.type = "button";
        button.classList.add("reset");
        button.dataset.icon = "x-circle";
        button.setAttribute("aria-label", "remove student");
        button.setAttribute("title", "Remove student");

        button.addEventListener("click", function () {
          deleteStudent(id);
        });
        li.appendChild(button);

        studentList.appendChild(li);
      });
      count = Object.keys(students).length;
      randomLink.disabled = false;
    } else {
      if (Object.keys(result.classes).length > 1) {
        let a = document.createElement("a");
        a.href = `copy.html?id=${classId}`;
        a.textContent = "Copy another class?";
        studentList.appendChild(a);
      } else {
        let p = document.createElement("p");
        p.textContent = "No students yet!";
        studentList.appendChild(p);
      }
      randomLink.disabled = true;
    }
    studentCount.textContent = `Students (${count})`;
  });
}

document.forms["add-student"].onsubmit = addStudent;
deleteClassButton.addEventListener("click", deleteClass);
randomLink.addEventListener("click", function () {
  document.location = `random.html?id=${classId}`;
});

renderStudents();

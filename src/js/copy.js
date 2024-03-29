import { cloneObj, getId, onLoad } from "./shared.js";

onLoad();
const classId = getId();
let copyFromSelect = document.getElementById("copy-from");
let copyTo = document.getElementById("copy-to");
let copyButton = document.getElementById("copy-button");

chrome.storage.sync.get("classes", function (result) {
  copyTo.innerHTML = `to <strong>${result.classes[classId]}</strong>`;
  Object.keys(result.classes).forEach(function (id) {
    if (id !== classId) {
      let option = document.createElement("option");
      option.value = id;
      option.textContent = result.classes[id];
      copyFromSelect.appendChild(option);
    }
  });
});

function copyClass(copyFromId) {
  if (copyFromId) {
    chrome.storage.sync.get("studentsByClassId", function (result) {
      let studentsByClassId = cloneObj(result.studentsByClassId);

      if (studentsByClassId[copyFromId]) {
        studentsByClassId[classId] = studentsByClassId[copyFromId];

        chrome.storage.sync.set(
          {
            studentsByClassId: studentsByClassId,
          },
          function () {
            document.location = `class.html?id=${classId}`;
          }
        );
      }
    });
  }
}

copyButton.addEventListener("click", function () {
  copyClass(copyFromSelect.value);
});

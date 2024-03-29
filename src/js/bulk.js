import { cloneObj, getId, onLoad } from "./shared.js";

onLoad();
const classId = getId();

const classLink = document.getElementById("class-link");
classLink.href = classLink.href + "?id=" + classId + "&back=true";

const bulkAddForm = document.getElementById("bulk-add");

bulkAddForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fd = new FormData(event.target);
  const students = fd.get("students");
  const delineator = fd.get("delineator");

  let names = [];

  switch (delineator) {
    case "newline": {
      names = students.split("\n");
      break;
    }
    case "comma": {
      names = students.split(",");
      break;
    }
  }

  names = names.map((name) => name.trim()).filter((name) => name);

  if (names.length === 0) return;

  chrome.storage.sync.get("studentsByClassId", (result) => {
    const studentsByClassId = cloneObj(result.studentsByClassId);

    if (!studentsByClassId[classId]) {
      studentsByClassId[classId] = [];
    }

    names.forEach((name) => {
      // TODO: Consider skipping names that already exist in list
      studentsByClassId[classId].push(name);
    });

    chrome.storage.sync.set(
      {
        studentsByClassId,
      },
      () => {
        document.location = `class.html?id=${classId}`;
      }
    );
  });
});

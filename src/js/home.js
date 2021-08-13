import { cloneObj, onLoad } from "./shared.js";

onLoad();
let classList = document.getElementById("class-list");
let classCount = document.getElementById("class-count");
let classNameInput = document.getElementById("name-input");

chrome.storage.sync.get("classes", function ({ classes }) {
  let count = 0;
  if (Object.keys(classes).length) {
    const ordered = Object.entries(classes);

    // TODO: Consider making this a setting
    ordered.sort((a, b) => {
      return a[1] < b[1] ? -1 : 1;
    });

    ordered.forEach(([id, name]) => {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.href = `class.html?id=${id}`;
      a.textContent = name;
      li.appendChild(a);
      classList.appendChild(li);
    });

    count = Object.keys(classes).length;
  } else {
    let el = document.createElement("li");
    el.classList.add("none-found");
    el.textContent = "None found";
    classList.appendChild(el);
  }
  classCount.textContent = `Classes (${count})`;
});

function addClass(event) {
  event.preventDefault();
  if (classNameInput.value) {
    chrome.storage.sync.get("classes", function (result) {
      let classes = cloneObj(result.classes);
      let id = new Date().getTime();
      classes[id] = classNameInput.value;

      chrome.storage.sync.set(
        {
          classes,
        },
        function () {
          classNameInput.value = "";
          document.location = `class.html?id=${id}`;
        }
      );
    });
  }
}

document.forms["add-class"].onsubmit = addClass;

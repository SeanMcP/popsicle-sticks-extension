import { cloneObj, getBestValue, onLoad } from "./shared.js";

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
      return getBestValue(a[1]) < getBestValue(b[1]) ? -1 : 1;
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
      const classes = cloneObj(result.classes);

      // Find the lowest available id
      let index = 0;
      let id;
      while (!id) {
        const potentialId = 'c' + index;
        if (classes.hasOwnProperty(potentialId)) {
          index++;
        } else {
          id = potentialId;
        }
      }

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

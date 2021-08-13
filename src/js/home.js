import { cloneObj, onLoad } from "./shared.js";

onLoad();
let classList = document.getElementById("class-list");
let classCount = document.getElementById("class-count");
let classNameInput = document.getElementById("name-input");

chrome.storage.sync.get("classes", function (result) {
  let count = 0;
  if (Object.keys(result.classes).length) {
    for (let id in result.classes) {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.href = `class.html?id=${id}`;
      a.textContent = result.classes[id];
      li.appendChild(a);
      classList.appendChild(li);
    }
    count = Object.keys(result.classes).length;
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


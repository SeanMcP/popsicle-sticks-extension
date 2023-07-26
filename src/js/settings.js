import { onLoad, setTheme } from "./shared.js";

onLoad();

chrome.storage.sync.get(["theme"], (result) => {
  document.querySelector(`option[value=${result.theme}`).selected = true;
});

function updateTheme(event) {
  if (event.target.value) {
    chrome.storage.sync.set(
      {
        theme: event.target.value,
      },
      setTheme
    );
  }
}

document.getElementById("theme").onchange = updateTheme;

// This assumes there is only one link on the page
document.querySelector("a[data-url]").addEventListener("click", (event) => {
  event.preventDefault();
  chrome.tabs.create({ url: event.target.dataset.url });
});

export function addToHistory(data = null) {
  chrome.storage.sync.set({
    history: {
      data,
      path: window.location.pathname + window.location.search,
      timestamp: new Date().getTime(),
    },
  });
}

export function cloneObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function getId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || "";
}

export function onLoad() {
  console.log("Up and running 🏃‍♂️");

  setTheme();

  const popOutButton = document.getElementById("pop-out");

  if (popOutButton) {
    popOutButton.addEventListener("click", () => {
      const bodyRect = document.querySelector("body").getBoundingClientRect();
      alert(bodyRect.width + 'x' + bodyRect.height)
      chrome.windows.create({
        url: window.location.href,
        type: "popup",
        width: Math.round(bodyRect.width ? bodyRect.width + 60 : 375),
        height: Math.round(bodyRect.height ? bodyRect.height + 30 : 600),
      });
    });
  }
}

export function setTheme() {
  chrome.storage.sync.get("theme", (result) => {
    document.body.dataset.theme = result.theme;
  });
}

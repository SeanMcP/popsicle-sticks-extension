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
}

export function setTheme() {
  chrome.storage.sync.get("theme", (result) => {
    document.body.dataset.theme = result.theme;
  });
}

export function addToHistory(data = null) {
  chrome.storage.local.set({
    history: {
      data,
      path: window.location.pathname + window.location.search,
      timestamp: new Date().getTime(),
    },
  });
}

function historyCutoff() {
  // Five minutes in the past
  return new Date().getTime() - 5 * 60 * 1000;
}

const page = window.location.pathname.split(".html")[0].split("/").pop();

switch (page) {
  case "home": {
    if (window.location.search.includes("back=true")) {
      chrome.storage.local.set({
        history: null,
      });
    } else {
      chrome.storage.local.get("history", ({ history }) => {
        if (history && history.timestamp > historyCutoff()) {
          window.location = history.path;
        } else {
          chrome.storage.local.set({ history: null });
        }
      });
    }
    break;
  }
  /**
   * Random handles its own history with data, so we don't
   * want to set it automatically on page load
   */
  case "random": {
    break;
  }
  default: {
    addToHistory();
  }
}

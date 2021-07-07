function historyCutoff() {
  // Five minutes in the past
  return new Date().getTime() - 5 * 60 * 1000;
}

if (window.location.search.includes("back=true")) {
  // If the user intentionally went back, then clear history
//   chrome.storage.sync.set({ history: null });
} else {
  chrome.storage.sync.get("history", ({ history }) => {
    if (history && history.timestamp > historyCutoff()) {
      window.location = history.path;
    } else {
      chrome.storage.sync.set({ history: null });
    }
  });
}

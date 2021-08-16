chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.get(["initiated", "history"], (result) => {
    if (result.initiated) {
      return;
    }
    if (typeof result.history !== undefined) {
      chrome.storage.sync.clear("history");
    }

    chrome.storage.sync.set({
      classes: {},
      initiated: true,
      studentsByClassId: {},
      theme: "light",
    });
  });
});

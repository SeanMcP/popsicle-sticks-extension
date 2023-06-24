chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.get(["classes", "v", "studentsByClassId"], (result) => {
    if (result.v == 1) {
      // Current version; no setup required
      return;
    } else if (!result.v && typeof result.classes === "object") {
      // Pre-versioned release; migrate data
      // KEEP THIS BLOCK IN SYNC WITH backup.js
      const classIds = Object.keys(result.classes || {});
      if (classIds && classIds.length) {
        const classes = {};
        const studentsByClassId = {};

        classIds.forEach((id, i) => {
          const newId = "c" + i;
          classes[newId] = result.classes[id];
          if (result.studentsByClassId[id]) {
            studentsByClassId[newId] = Object.values(
              result.studentsByClassId[id]
            );
          }
        });

        chrome.storage.sync.set(
          {
            classes,
            studentsByClassId,
            v: 1,
          },
          () => {
            chrome.storage.sync.remove(["history", "initiated"]);
          }
        );
      }
    } else {
      // First install; initialize state
      chrome.storage.sync.set({
        classes: {},
        studentsByClassId: {},
        theme: "light",
        v: 1,
      });
    }
  });
});

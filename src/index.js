chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.get(["classes", "v", "studentsByClassId"], (result) => {
    if (!result.v || result.v != 1) {
      const classIds = Object.keys(result.classes);
      if (classIds && classIds.length) {
        // Migrate to new format
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

      return;
    }

    chrome.storage.sync.set({
      classes: {},
      studentsByClassId: {},
      theme: "light",
      v: 1,
    });
  });
});

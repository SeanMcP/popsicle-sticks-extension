chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({
        classes: {},
        studentsByClassId: {},
        theme: 'light'
    })
})

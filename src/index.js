chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.get(['initiated'], result => {
        if (result.initiated) {
            return
        }
        chrome.storage.sync.set({
            classes: {},
            history: null,
            initiated: true,
            studentsByClassId: {},
            theme: 'light'
        })
    })
})

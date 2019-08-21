function generateJSONBlob(data) {
    return new Blob([JSON.stringify(data, null, 2)], { type: 'octet/stream' })
}

function downloadFile() {
    chrome.storage.sync.get(['classes', 'studentsByClassId'], result => {
        const blob = generateJSONBlob({
            classes: result.classes,
            studentsByClassId: result.studentsByClassId
        })
        const url = URL.createObjectURL(blob)
        chrome.downloads.download({
            url,
            filename: 'popsicle-sticks-data.json'
        })
    })
}

document.forms['download-data'].onsubmit = downloadFile

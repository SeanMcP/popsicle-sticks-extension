const secret = 'Luke 8:17'

function generateJSONBlob(data) {
    return new Blob([JSON.stringify(data, null, 2)], { type: 'octet/stream' })
}

function downloadFile() {
    chrome.storage.sync.get(
        ['classes', 'studentsByClassId', 'theme'],
        result => {
            const blob = generateJSONBlob({
                classes: result.classes,
                secret,
                studentsByClassId: result.studentsByClassId,
                theme: result.theme
            })
            const url = URL.createObjectURL(blob)
            chrome.downloads.download({
                url,
                filename: 'popsicle-sticks-data.json'
            })
        }
    )
}

document.forms['download-data'].onsubmit = downloadFile

function saveUploadedData(event) {
    const result = JSON.parse(event.target.result)
    if (result.secret === secret) {
        const dataToSet = {}
        if (result.hasOwnProperty('classes')) dataToSet.classes = result.classes
        if (result.hasOwnProperty('studentsByClassId'))
            dataToSet.studentsByClassId = result.studentsByClassId

        chrome.storage.sync.set(dataToSet, function() {
            document.location = 'home.html'
        })
    } else {
        handleUploadError()
    }
}

const uploadForm = document.forms['upload-data']

function uploadFile(event) {
    event.preventDefault()
    const file = new FormData(event.target).get('file')

    if (file.size > 0) {
        const reader = new FileReader()
        reader.onload = saveUploadedData
        reader.readAsBinaryString(file)
    }
}

function handleUploadError() {
    const message = document.createElement('p')
    message.classList.add('error-message')
    message.textContent = "Uh oh! That data wasn't formatted correctly."
    uploadForm.reset()
    uploadForm.classList.add('--error')
    uploadForm.appendChild(message)
    setTimeout(() => {
        uploadForm.classList.remove('--error')
        uploadForm.removeChild(message)
    }, 5000)
}

uploadForm.onsubmit = uploadFile

chrome.storage.sync.get(['theme'], result => {
    document.querySelector(`option[value=${result.theme}`).selected = true
})

function updateTheme(event) {
    if (event.target.value) {
        chrome.storage.sync.set(
            {
                theme: event.target.value
            },
            setTheme
        )
    }
}

document.getElementById('theme').onchange = updateTheme

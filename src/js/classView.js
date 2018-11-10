var classId = location.hash.slice(1);
var heading = document.querySelector('header > h1');

chrome.storage.sync.get('classes', function(result) {
    heading.textContent = result.classes[classId];
});
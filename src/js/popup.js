var classList = document.getElementById('class-list');

chrome.storage.sync.get('classes', function(result) {
    for (var id in result.classes) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = `class-view.html#${id}`;
        a.textContent = result.classes[id];
        li.appendChild(a);
        classList.appendChild(li);
    };
});
var classList = document.getElementById('class-list');
var classNameInput = document.getElementById('name-input');
var addClassButton = document.getElementById('add-button');

chrome.storage.sync.get('classes', function(result) {
    for (var id in result.classes) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = `class.html#${id}`;
        a.textContent = result.classes[id];
        li.appendChild(a);
        classList.appendChild(li);
    };
});

function addClass() {
    chrome.storage.sync.get('classes', function(result) {
        var classes = cloneObj(result.classes);
        var id = new Date().getTime();
        classes[id] = classNameInput.value;

        chrome.storage.sync.set({
            classes: classes,
        }, function() {
            classNameInput.value = '';
            document.location = `class.html#${id}`
        });
    });
}

addClassButton.addEventListener('click', addClass);
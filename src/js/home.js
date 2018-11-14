var classList = document.getElementById('class-list');
var classCount = document.getElementById('class-count');
var classNameInput = document.getElementById('name-input');
var addClassButton = document.getElementById('add-button');

chrome.storage.sync.get('classes', function(result) {
    var count = 0;
    if (Object.keys(result.classes).length) {
        for (var id in result.classes) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = `class.html#${id}`;
            a.textContent = result.classes[id];
            li.appendChild(a);
            classList.appendChild(li);
        };
        count = Object.keys(result.classes).length;
    } else {
        classList.appendChild(buildNoneFoundElement('li'));
    }
    classCount.textContent = `Classes (${count})`;
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
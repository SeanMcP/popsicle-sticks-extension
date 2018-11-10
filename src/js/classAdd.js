var classNameInput = document.getElementById('className');
var addClassButton = document.getElementById('classButton');

function addClass() {
    chrome.storage.sync.get('classes', function(result) {
        var classes = cloneObj(result.classes);
        var id = new Date().getTime();
        classes[id] = classNameInput.value;

        chrome.storage.sync.set({
            classes: classes,
        }, function() {
            classNameInput.value = '';
            document.location = `class-view.html#${id}`
        });
    });
}

addClassButton.addEventListener('click', addClass);
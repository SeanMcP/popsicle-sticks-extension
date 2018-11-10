var classId = location.hash.slice(1);
var current = document.querySelector("main > h1");
var nextButton = document.getElementById("next-button");
var prevButton = document.getElementById("prev-button");
var students = [];
var index = 0;

chrome.storage.sync.get("studentsByClassId", function(result) {
    var studentsById = result.studentsByClassId[classId];
    for (var id in studentsById) {
        students.push(studentsById[id]);
    }
    students = shuffle(students);
    renderCurrent();
});

function renderCurrent() {
    current.textContent = students[index];
}

// Taken from https://stackoverflow.com/a/6274398/8486161
function shuffle(array) {
    var counter = array.length;
    while (counter > 0) {
        var index = Math.floor(Math.random() * counter);
        counter--;
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

function prev() {
    index--;
    if (index < 0) {
        index = students.length - 1;
        students = shuffle(students);
    }
    renderCurrent();
}

function next() {
    index++;
    if (index > students.length - 1) {
        index = 0;
        students = shuffle(students);
    }
    renderCurrent();
}

prevButton.addEventListener('click', prev);
nextButton.addEventListener('click', next);

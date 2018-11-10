var classId = location.hash.slice(1);
var heading = document.querySelector('header > h1');
var studentNameInput = document.getElementById('name-input');
var addStudentButton = document.getElementById('add-button');
var studentList = document.getElementById('student-list');

chrome.storage.sync.get('classes', function(result) {
    heading.textContent = result.classes[classId];
});

function addStudent() {
    while (studentList.firstChild) {
        studentList.removeChild(studentList.firstChild);
    }
    chrome.storage.sync.get('studentsByClassId', function(result) {
        var studentsByClassId = cloneObj(result.studentsByClassId);

        var studentId = new Date().getTime();
        if (!studentsByClassId[classId]) {
            studentsByClassId[classId] = {};
        }
        studentsByClassId[classId][studentId] = studentNameInput.value;

        chrome.storage.sync.set({
            studentsByClassId: studentsByClassId,
        }, function() {
            studentNameInput.value = '';
            renderStudents();
        });
    });
}

function renderStudents() {
    chrome.storage.sync.get('studentsByClassId', function(result) {
        var students = result.studentsByClassId[classId];
        for (var id in students) {
            var li = document.createElement('li');
            var span = document.createElement('span');
            span.textContent = students[id];
            li.appendChild(span);

            // var button = document.createElement('button');
            // button.type = 'button';
            // button.textContent = 'Delete';
            // li.appendChild(button);

            studentList.appendChild(li);
        }
    });
}

addStudentButton.addEventListener('click', addStudent);

renderStudents();
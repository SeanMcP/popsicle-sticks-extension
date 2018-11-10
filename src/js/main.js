console.log('Up and running 🏃‍♂️');

function cloneObj(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function buildNoneFoundElement(tag) {
    var el = document.createElement(tag);
    el.classList.add('none-found');
    el.textContent = 'None found';
    return el;
}

function buildButton(id, text) {
    var button = document.createElement('button');
    button.type = 'button';
    button.id = id;
    button.textContent = text;
    return button;
}
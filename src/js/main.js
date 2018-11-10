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
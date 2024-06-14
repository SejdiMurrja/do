let square = document.getElementById('katror');
let changeColorButton = document.getElementById('change-color-button');
let undoButton = document.getElementById('undo-button');
let redoButton = document.getElementById('redo-button');

let undoColorsContainer = document.getElementById('undo-colors');
let redoColorsContainer = document.getElementById('redo-colors');

let colorHistory = ['red'];
let currentIndex = 0;
let maxColors = 6;

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function changeColor() {
    let newColor = getRandomColor();
    square.style.backgroundColor = newColor;
    colorHistory.push(newColor);
    currentIndex++;
    trimHistory();
    updateColorBoxes();
    updateButtons();
}

function undoColor() {
    if (currentIndex > 0) {
        currentIndex--;
        square.style.backgroundColor = colorHistory[currentIndex];
    }
    updateColorBoxes();
    updateButtons();
}

function redoColor() {
    if (currentIndex < colorHistory.length - 1) {
        currentIndex++;
        square.style.backgroundColor = colorHistory[currentIndex];
    }
    updateColorBoxes();
    updateButtons();
}

function trimHistory() {
    if (colorHistory.length > maxColors) {
        colorHistory.splice(0, colorHistory.length - maxColors);
        currentIndex = colorHistory.length - 1;
    }
}

function updateColorBoxes() {
    undoColorsContainer.innerHTML = '';
    redoColorsContainer.innerHTML = '';

    for (let i = currentIndex - 1; i >= 0 && i >= currentIndex - maxColors; i--) {
        let colorDiv = document.createElement('div');
        colorDiv.className = 'color-preview';
        colorDiv.style.backgroundColor = colorHistory[i];
        colorDiv.addEventListener('click', () => setColorFromUndo(i));
        undoColorsContainer.appendChild(colorDiv);
    }

    for (let i = currentIndex + 1; i < colorHistory.length && i <= currentIndex + maxColors; i++) {
        let colorDiv = document.createElement('div');
        colorDiv.className = 'color-preview';
        colorDiv.style.backgroundColor = colorHistory[i];
        colorDiv.addEventListener('click', () => setColorFromRedo(i));
        redoColorsContainer.appendChild(colorDiv);
    }
}

function setColorFromUndo(index) {
    square.style.backgroundColor = colorHistory[index];
    currentIndex = index;
    updateColorBoxes();
    updateButtons();
}

function setColorFromRedo(index) {
    square.style.backgroundColor = colorHistory[index];
    currentIndex = index;
    updateColorBoxes();
    updateButtons();
}

function updateButtons() {
    undoButton.disabled = currentIndex === 0;
    redoButton.disabled = currentIndex === colorHistory.length - 1;
}

changeColorButton.addEventListener('click', changeColor);
undoButton.addEventListener('click', undoColor);
redoButton.addEventListener('click', redoColor);

updateColorBoxes();
updateButtons();

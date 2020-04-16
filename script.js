const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [ // array of all winning combos
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text');
let circleTurn;

// lay out initial board at the start of each game
function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => { // loop through each cell
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });

    setBoardHoverClass();

    winningMessageElement.classList.remove('show');
}

startGame();

// if restart button is clicked
restartButton.addEventListener('click', startGame);

// places player turn in grid
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

// swap player turns
function swapTurns() {
    circleTurn = !circleTurn;
}

// deals with hover animation
function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

// checks if winning comb are met
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

// checks for draws
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

// endgame message + restart
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "Player O" : "Player X"} Wins!`;
    }

    winningMessageElement.classList.add('show');
}

// main function to deal with functionality of each player turn
// can:
//  place mark
//  check for win
//  check for draw
//  switch turns
function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass(); 
    }
}


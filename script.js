const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winnig-message-text]");
const winningMessage = document.querySelector('[data-winnig-message]');
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () => {
    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove("o");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    }


    setBoardHoverClass();
    winningMessage.classList.remove("show-winnig-messege");
};

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = "Empate!"
    } else {
        winningMessageTextElement.innerText = isCircleTurn ? "O Venceu!" : "X Venceu";
    }

    winningMessage.classList.add("show-winnig-messege");
};


const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("o");
    })
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

const setBoardHoverClass = () => {
    board.classList.remove("o")
    board.classList.remove("x")

    if (isCircleTurn) {
        board.classList.add("o");
    } else {
        board.classList.add("x");
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn

    setBoardHoverClass();
};

const handleClick = (e) => {

    const cell = e.target
    const classToAdd = isCircleTurn ? "o" : "x";

    placeMark(cell, classToAdd);

    const isWin = checkForWin(classToAdd);

    const isDraw = checkForDraw();

    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        swapTurns();
    }
};

startGame();

restartButton.addEventListener("click", startGame);
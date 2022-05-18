const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector("[data-board]");

let isCircleTurn;

const startGame = () => {
    for (const cell of cellElements) {
        cell.addEventListener("click", handleClick, {once: true});
    }

    isCircleTurn = false;

    board.classList.add("x");
};

const placeMark = (cell, classToAdd) =>{
    cell.classList.add(classToAdd);    
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn

    board.classList.remove("o")
    board.classList.remove("x")

    if(isCircleTurn) {
        board.classList.add("o");
    } else {
        board.classList.add("x");
    }
};

const handleClick = (e) =>{

const cell = e.target 
const classToAdd = isCircleTurn ? "o" : "x";

placeMark(cell, classToAdd);

swapTurns();
}

startGame();
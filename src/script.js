const ROWS = 24;
const COLUMNS = 10;

let score;
let gameboard;
let timer;

const gameboardElement = document.querySelector('#gameboard');
let gameboardDivs;
const startButton = document.querySelector('button');


function setup() {
    // construct gameboard
    for (let i = 0; i < ROWS * COLUMNS; i++) {
        gameboardElement.appendChild(document.createElement('div'));
    }
    // gameboard "square" positions which will be colored
    gameboardDivs = document.querySelectorAll('#gameboard div');

    startButton.addEventListener('click', startGame);
}

function startGame() {
    score = 0;


    timer = setInterval(gameTick, 10);
    gameboardDivs.forEach(div => div.style = 'background-color: white;');
}

function endGame() {
    clearInterval(timer);
}

let fallingPiece;
function gameTick() {
    // if there is no falling piece, spawn a new one
    if (!fallingPiece) {
        fallingPiece = new Piece();
        draw(fallingpiece.color, fallingPiece.position);
    } else { // if there is a falling piece, move it down
        draw('white', fallingPiece.position);
        fallingPiece.moveDown();
        draw(fallingPiece.color, fallingPiece.position);
    }

    // check if the falling piece hit the ground
}

function draw(color, positions) {
    positions.forEach(position => {
        if (position.y < 0 || position.y >= ROWS || position.x < 0 || position.x >= COLUMNS) {
            throw new Error('Position out of bounds');
        }
        gameboardDivs[position.y * 10 + position.x].style = `background-color: ${color}`;
        console.log(position);
    })
}

class Piece {
    position;
    color;
    constructor() {
        // TODO pick a random piece
        // for now only THE BEST PIECE 4 down
        this.position = [new Position(0, 1), new Position(0, 0), new Position(0, 2), new Position(0, 3)];
        color = 'blue';
    }

    moveDown() {
        this.position.forEach(position => position.y += 1);
    }
}

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Board {
    constructor() {
        this.occupiedPositions = new Set();
    }

    addBlock(position) {
        this.occupiedPositions.add(position.toString());
    }

    removeBlock(position) {
        this.occupiedPositions.delete(position.toString());
    }

    check(position) {
        return this.occupiedPositions.has(position.toString());
    }
}


setup();
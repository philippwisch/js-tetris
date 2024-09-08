const ROWS = 24;
const COLUMNS = 10;

let gameRunning = false;

let score;
let gameBoard;
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
    if (!gameRunning) {
        gameRunning = true;
        score = 0;
        gameBoard = new Board();
        timer = setInterval(gameTick, 100);
        gameboardDivs.forEach(div => div.style = 'background-color: white;');
    }
}

function endGame() {
    if (gameRunning) {
        gameRunning = false;
        clearInterval(timer);
    }
}

let fallingPiece;
function gameTick() {
    // check for collisions
    if (fallingPiece) {
        // hitting the floor
        const floor_collision = fallingPiece.positions.some(position => position.y === ROWS - 1);
        // if there is a block DIRECTLY beneath the piece (actually any of the blocks the piece is made out of)
        const collision = fallingPiece.positions.some(position => gameBoard.isOccupied(new Position(position.x, position.y + 1)));

        // the piece can't move down any more and stays where it currently is.
        if (floor_collision || collision) {
            fallingPiece.positions.forEach(position => {
                console.log(position);
                gameBoard.addBlock(position);
            });
            fallingPiece = null;
            return;
        }
    }

    // if there is no falling piece, spawn a new one
    if (!fallingPiece) {
        fallingPiece = new Piece();
        draw(fallingPiece.color, fallingPiece.positions);
    } else { // if there is a falling piece, move it down
        draw('white', fallingPiece.positions);
        fallingPiece.moveDown();
        draw(fallingPiece.color, fallingPiece.positions);
    }
}

function draw(color, positions) {
    positions.forEach(position => {
        if (position.y < 0 || position.y >= ROWS || position.x < 0 || position.x >= COLUMNS) {
            throw new Error('Position out of bounds');
        }
        gameboardDivs[position.y * 10 + position.x].style = `background-color: ${color}`;
    })
}

class Piece {
    positions;
    color;
    constructor() {
        // TODO pick a random piece
        // for now only THE BEST PIECE 4 down
        this.positions = [new Position(0, 1), new Position(0, 0), new Position(0, 2), new Position(0, 3)];
        this.color = 'blue';
    }

    moveDown() {
        this.positions.forEach(position => position.y += 1);
    }
}

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `${this.x},${this.y}`;
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

    isOccupied(position) {
        return this.occupiedPositions.has(position.toString());
    }
}


setup();
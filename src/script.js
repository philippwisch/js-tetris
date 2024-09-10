import { GameBoard } from './classes/GameBoard.js';
import { Position } from './classes/Position.js';
import { Tetromino } from './classes/Tetromino.js';

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

function showGameOverMessage(isShowing) {
    let el = document.querySelector('#game-over');
    el.style.display = isShowing ? 'block' : 'none';
}

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        showGameOverMessage(false);

        setupGame();
    }
}

function setupGame() {
    score = 0;
    gameBoard = new GameBoard();
    timer = setInterval(gameTick, 100);
    gameboardDivs.forEach(div => div.style = 'background-color: white;');
}

function endGame() {
    if (gameRunning) {
        gameRunning = false;
        showGameOverMessage(true);

        clearInterval(timer);
    }
}

let fallingPiece;
function gameTick() {
    // check for collisions
    if (fallingPiece) {
        // hitting the floor
        const floorCollision = fallingPiece.positions.some(position => position.y === ROWS - 1);
        // if there is a block DIRECTLY beneath the piece (actually any of the blocks the piece is made out of)
        const collision = fallingPiece.positions.some(position => gameBoard.isOccupied(new Position(position.x, position.y + 1)));

        // the piece can't move down any more and stays where it currently is.
        if (floorCollision || collision) {
            // check for game over
            const gameOver = fallingPiece.positions.some(position => position.y === 0);
            if (gameOver) {
                endGame();
                return;
            }

            fallingPiece.positions.forEach(position => {
                gameBoard.addBlock(position);
            });
            fallingPiece = null;
            return;
        }
    }

    // if there is no falling piece, spawn a new one
    if (!fallingPiece) {
        fallingPiece = Tetromino.createRandomTetromino();
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

setup();
import { GameBoard } from './classes/GameBoard.js';
import { Position } from './classes/Position.js';
import { Tetromino } from './classes/Tetromino.js';

const ROWS = 24;
const COLUMNS = 10;

let gameRunning = false;

let score;
let gameBoard;
let timer;
let fallingPiece;

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
    fallingPiece = null;
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

function gameTick() {
    // if there is no falling piece, spawn a new one
    if (!fallingPiece) {
        fallingPiece = Tetromino.createRandomTetromino();
        draw(fallingPiece.color, fallingPiece.positions);
    }

    if (fallingPiece) {
        // Firstly, check if the falling piece is colliding with any already placed blocks,
        // which means that it CAN'T move down any more
        if (fallingPieceHasCollided()) {
            if (isGameOver()) {
                endGame();
            } else {
                // when the current falling piece has collided, that piece's/tetromino's blocks will be added to the gameboard,
                // and those blocks can be removed when a row is filled with blocks
                placeFallingPieceToGameBoard();
            }
            // if there's no collision, the falling piece can move down, so simply move it down
        } else {
            moveDownFallingPiece();
        }
    }
}

/**
 * Checks if the falling piece's lowest block(s) is currently colliding with any other blocks or the floor.
 * @returns {boolean} true if the falling piece is colliding, false otherwise
 */
function fallingPieceHasCollided() {
    // hitting the floor
    const floorCollision = fallingPiece.positions.some(position => position.y === ROWS - 1);
    // if there is a block DIRECTLY beneath the piece (actually any of the blocks the piece is made out of)
    const collision = fallingPiece.positions.some(position => gameBoard.isOccupied(new Position(position.x, position.y + 1)));

    return floorCollision || collision;
}

/**
 * Adds all the blocks of the falling piece to the game board, and then removes it, i.e. sets fallingPiece to null.
 */
function placeFallingPieceToGameBoard() {
    fallingPiece.positions.forEach(position => {
        gameBoard.addBlock(position);
    });
    fallingPiece = null;
}

/**
 * @returns {boolean} if the game is over (i.e. if any block of the current falling piece is touching the upper edge)
 */
function isGameOver() {
    // if any block is touching the upper edge, the game is over
    return fallingPiece.positions.some(position => position.y === 0);
}

/**
 * Move the falling piece down by one row. Should be called every time the game loops.
 * This function will move down the falling piece by one row, and also properly redraw it.
 */
function moveDownFallingPiece() {
    draw('white', fallingPiece.positions);
    fallingPiece.moveDown();
    draw(fallingPiece.color, fallingPiece.positions);
}

/**
 * Draws a set of blocks (for the given positions) of a given color on the gameboard.
 * If any of the positions are out of bounds, an error is thrown.
 * @param {string} color The color of the blocks to draw
 * @param {Position[]} positions The positions of the blocks to draw
 */
function draw(color, positions) {
    positions.forEach(position => {
        if (position.y < 0 || position.y >= ROWS || position.x < 0 || position.x >= COLUMNS) {
            throw new Error('Position out of bounds');
        }
        // convert the x,y position into a single index (because the gameboard divs use ids from 0-240, from top left to bottom right)
        gameboardDivs[position.y * 10 + position.x].style = `background-color: ${color}`;
    })
}

setup();
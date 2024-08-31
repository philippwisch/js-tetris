let score;
let gameboard;
let timer;

const gameboardElement = document.querySelector('#gameboard');
let gameboardDivs;
const startButton = document.querySelector('button');


function setup() {
    // construct gameboard
    for (let i = 0; i < 240; i++) {
        gameboardElement.appendChild(document.createElement('div'));
    }
    // gameboard reference for clearing the board later
    gameboardDivs = document.querySelectorAll('#gameboard div');

    startButton.addEventListener('click', startGame);
}

function startGame() {
    score = 0;
    gameboard = [];
    for (let i = 0; i < 24; i++) {
        gameboard.push(new Array(10).fill(false));
    }
    timer = setInterval(gameTick, 1000);
    gameboardDivs.forEach(div => div.style = 'background-color: white;');
}

function endGame() {
    clearInterval(timer);
}

function gameTick() {
    // if there is no falling piece, spawn a new one

    // if there is a falling piece, move it down

    // check if the falling piece hit the ground
}

setup();
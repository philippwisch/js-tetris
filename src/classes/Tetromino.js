import { Position } from './Position.js';

const TETROMINO_TYPES = [
    // I
    { color: 'blue', coords: [[3, 0], [4, 0], [5, 0], [6, 0]] },
    // J
    { color: 'orange', coords: [[3, 0], [3, 1], [4, 1], [5, 1]] },
    // L
    { color: 'purple', coords: [[3, 1], [4, 1], [5, 1], [5, 0]] },
    // O
    { color: 'yellow', coords: [[4, 0], [5, 0], [4, 1], [5, 1]] },
    // S
    { color: 'green', coords: [[4, 1], [5, 1], [3, 0], [4, 0]] },
    // T
    { color: 'cyan', coords: [[3, 1], [4, 1], [5, 1], [4, 0]] },
    // Z
    { color: 'red', coords: [[3, 1], [4, 1], [4, 0], [5, 0]] },
];

export class Tetromino {
    color;
    positions;

    constructor(color, coords) {
        this.color = color;
        this.positions = coords.map(([x, y]) => new Position(x, y));
    }

    static createRandomTetromino() {
        const randomIndex = Math.floor(Math.random() * TETROMINO_TYPES.length);
        const props = TETROMINO_TYPES[randomIndex];

        return new Tetromino(props.color, props.coords);
    }

    moveDown() {
        this.positions.forEach(position => position.y += 1);
    }
}
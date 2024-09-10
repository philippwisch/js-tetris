import { Position } from './Position.js';

export class Tetromino {
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
export class GameBoard {
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
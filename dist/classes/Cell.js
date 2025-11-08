import { Direction, createPosition, createClosedWalls, createOpenWalls, hasWall, removeWall, addWall, movePosition, } from "../types/index.js";
class Cell {
    _position;
    _walls;
    _visited;
    constructor(x, y, walls) {
        if (!Number.isInteger(x) || x < 0) {
            throw new Error(`Invalid x coordinate: ${x}. Must be non-negative integer.`);
        }
        if (!Number.isInteger(y) || y < 0) {
            throw new Error(`Invalid y coordinate: ${y}. Must be non-negative integer.`);
        }
        this._position = createPosition(x, y);
        this._walls = walls ?? createClosedWalls();
        this._visited = false;
    }
    get position() {
        return this._position;
    }
    get x() {
        return this._position.x;
    }
    get y() {
        return this._position.y;
    }
    get visited() {
        return this._visited;
    }
    set visited(value) {
        this._visited = value;
    }
    hasWallInDirection(direction) {
        return hasWall(this._walls, direction);
    }
    isOpenInDirection(direction) {
        return !this.hasWallInDirection(direction);
    }
    getWalledDirections() {
        return Object.entries(this._walls)
            .filter(([_, hasWall]) => hasWall)
            .map(([direction, _]) => direction);
    }
    getOpenDirections() {
        return Object.entries(this._walls)
            .filter(([_, hasWall]) => !hasWall)
            .map(([direction, _]) => direction);
    }
    removeWallMutable(direction) {
        this._walls = removeWall(this._walls, direction);
    }
    addWallMutable(direction) {
        this._walls = addWall(this._walls, direction);
    }
    getNeighborPosition(direction) {
        return movePosition(this._position, direction, 1);
    }
    manhattanDistanceTo(other) {
        const otherPos = other instanceof Cell ? other.position : other;
        return Math.abs(this.x - otherPos.x) + Math.abs(this.y - otherPos.y);
    }
    isAdjacentTo(other) {
        return this.manhattanDistanceTo(other) === 1;
    }
    reset() {
        this._visited = false;
    }
    getWallCount() {
        return this.getWalledDirections().length;
    }
    toString() {
        const wallCount = this.getWallCount();
        const visitedStatus = this._visited ? "visited" : "unvisited";
        return `Cell(${this.x},${this.y}): ${wallCount} walls, ${visitedStatus}`;
    }
    static createOpen(x, y) {
        return new Cell(x, y, createOpenWalls());
    }
}
export { Cell };
//# sourceMappingURL=Cell.js.map
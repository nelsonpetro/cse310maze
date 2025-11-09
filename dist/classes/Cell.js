import { Direction, createPosition, createClosedWalls, createOpenWalls, hasWall, removeWall, addWall, movePosition, } from "../types/index.js";
// Represents a single cell in the maze grid with position, walls, and state
class Cell {
    _position; // Cell's fixed coordinate in the maze
    _walls; // Which directions have walls (up, down, left, right)
    _visited; // Used for maze generation and pathfinding algorithms
    // Creates a new cell at the specified coordinates with optional wall configuration
    constructor(x, y, walls) {
        // Validate coordinates are non-negative integers
        if (!Number.isInteger(x) || x < 0) {
            throw new Error(`Invalid x coordinate: ${x}. Must be non-negative integer.`);
        }
        if (!Number.isInteger(y) || y < 0) {
            throw new Error(`Invalid y coordinate: ${y}. Must be non-negative integer.`);
        }
        this._position = createPosition(x, y);
        this._walls = walls ?? createClosedWalls(); // Default to fully walled cell
        this._visited = false;
    }
    // Returns the cell's position in the maze
    get position() {
        return this._position;
    }
    // Returns the x coordinate (column) of the cell
    get x() {
        return this._position.x;
    }
    // Returns the y coordinate (row) of the cell
    get y() {
        return this._position.y;
    }
    // Returns whether this cell has been visited during algorithm execution
    get visited() {
        return this._visited;
    }
    // Sets the visited state for maze generation and pathfinding algorithms
    set visited(value) {
        this._visited = value;
    }
    // Checks if there is a wall in the specified direction
    hasWallInDirection(direction) {
        return hasWall(this._walls, direction);
    }
    // Checks if the cell is open (no wall) in the specified direction
    isOpenInDirection(direction) {
        return !this.hasWallInDirection(direction);
    }
    // Returns an array of directions where this cell has walls
    getWalledDirections() {
        return Object.entries(this._walls)
            .filter(([_, hasWall]) => hasWall)
            .map(([direction, _]) => direction);
    }
    // Returns an array of directions where this cell is open (no walls)
    getOpenDirections() {
        return Object.entries(this._walls)
            .filter(([_, hasWall]) => !hasWall)
            .map(([direction, _]) => direction);
    }
    // Removes a wall in the specified direction, modifying this cell
    removeWallMutable(direction) {
        this._walls = removeWall(this._walls, direction);
    }
    // Adds a wall in the specified direction, modifying this cell
    addWallMutable(direction) {
        this._walls = addWall(this._walls, direction);
    }
    // Calculates the position of the neighboring cell in the given direction
    getNeighborPosition(direction) {
        return movePosition(this._position, direction, 1);
    }
    // Calculates Manhattan distance (grid distance) to another cell or position
    manhattanDistanceTo(other) {
        const otherPos = other instanceof Cell ? other.position : other;
        return Math.abs(this.x - otherPos.x) + Math.abs(this.y - otherPos.y);
    }
    // Checks if another cell is directly adjacent (Manhattan distance of 1)
    isAdjacentTo(other) {
        return this.manhattanDistanceTo(other) === 1;
    }
    // Resets the cell's visited state for algorithm re-execution
    reset() {
        this._visited = false;
    }
    // Returns the number of walls surrounding this cell
    getWallCount() {
        return this.getWalledDirections().length;
    }
    // Returns a string representation of the cell for debugging
    toString() {
        const wallCount = this.getWallCount();
        const visitedStatus = this._visited ? "visited" : "unvisited";
        return `Cell(${this.x},${this.y}): ${wallCount} walls, ${visitedStatus}`;
    }
    // Factory method to create a cell with all walls removed
    static createOpen(x, y) {
        return new Cell(x, y, createOpenWalls());
    }
}
export { Cell };
//# sourceMappingURL=Cell.js.map
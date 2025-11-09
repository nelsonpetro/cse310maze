import { Direction } from "./Direction.js";
/**
 * Creates a new Walls object with all walls present (closed cell)
 * Used when initializing new cells in the maze
 * @returns Walls object with all four walls set to true
 */
function createClosedWalls() {
    return {
        [Direction.Up]: true,
        [Direction.Down]: true,
        [Direction.Left]: true,
        [Direction.Right]: true,
    };
}
/**
 * Creates a new Walls object with no walls present (open cell)
 * Useful for testing or creating completely open cells
 * @returns Walls object with all four walls set to false
 */
function createOpenWalls() {
    return {
        [Direction.Up]: false,
        [Direction.Down]: false,
        [Direction.Left]: false,
        [Direction.Right]: false,
    };
}
/**
 * Checks if a wall exists in the specified direction
 * @param walls - The walls object to check
 * @param direction - The direction to check for a wall
 * @returns True if a wall exists in the given direction, false otherwise
 */
function hasWall(walls, direction) {
    return walls[direction];
}
/**
 * Creates a new Walls object with the specified wall removed
 * Uses immutable update pattern to preserve original walls object
 * @param walls - The original walls object
 * @param direction - The direction of the wall to remove
 * @returns New Walls object with the specified wall set to false
 */
function removeWall(walls, direction) {
    return {
        ...walls,
        [direction]: false,
    };
}
/**
 * Creates a new Walls object with a wall added in the specified direction
 * Uses immutable update pattern to preserve original walls object
 * @param walls - The original walls object
 * @param direction - The direction where the wall should be added
 * @returns New Walls object with the specified wall set to true
 */
function addWall(walls, direction) {
    return {
        ...walls,
        [direction]: true,
    };
}
export { createClosedWalls, createOpenWalls, hasWall, removeWall, addWall };
//# sourceMappingURL=Walls.js.map
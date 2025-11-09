import { Direction } from "./Direction.js";
/**
 * Mapped type representing the four walls of a maze cell
 * Each direction maps to a boolean indicating whether a wall exists in that direction
 */
type Walls = {
    [key in Direction]: boolean;
};
/**
 * Creates a new Walls object with all walls present (closed cell)
 * Used when initializing new cells in the maze
 * @returns Walls object with all four walls set to true
 */
declare function createClosedWalls(): Walls;
/**
 * Creates a new Walls object with no walls present (open cell)
 * Useful for testing or creating completely open cells
 * @returns Walls object with all four walls set to false
 */
declare function createOpenWalls(): Walls;
/**
 * Checks if a wall exists in the specified direction
 * @param walls - The walls object to check
 * @param direction - The direction to check for a wall
 * @returns True if a wall exists in the given direction, false otherwise
 */
declare function hasWall(walls: Walls, direction: Direction): boolean;
/**
 * Creates a new Walls object with the specified wall removed
 * Uses immutable update pattern to preserve original walls object
 * @param walls - The original walls object
 * @param direction - The direction of the wall to remove
 * @returns New Walls object with the specified wall set to false
 */
declare function removeWall(walls: Walls, direction: Direction): Walls;
/**
 * Creates a new Walls object with a wall added in the specified direction
 * Uses immutable update pattern to preserve original walls object
 * @param walls - The original walls object
 * @param direction - The direction where the wall should be added
 * @returns New Walls object with the specified wall set to true
 */
declare function addWall(walls: Walls, direction: Direction): Walls;
export type { Walls };
export { createClosedWalls, createOpenWalls, hasWall, removeWall, addWall };
//# sourceMappingURL=Walls.d.ts.map
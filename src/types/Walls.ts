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
function createClosedWalls(): Walls {
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
function createOpenWalls(): Walls {
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
function hasWall(walls: Walls, direction: Direction): boolean {
  return walls[direction];
}

/**
 * Creates a new Walls object with the specified wall removed
 * Uses immutable update pattern to preserve original walls object
 * @param walls - The original walls object
 * @param direction - The direction of the wall to remove
 * @returns New Walls object with the specified wall set to false
 */
function removeWall(walls: Walls, direction: Direction): Walls {
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
function addWall(walls: Walls, direction: Direction): Walls {
  return {
    ...walls,
    [direction]: true,
  };
}

export type { Walls };
export { createClosedWalls, createOpenWalls, hasWall, removeWall, addWall };

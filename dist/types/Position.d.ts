import { Direction } from "./Direction.js";
/**
 * Interface representing a 2D coordinate position in the maze
 * Used throughout the system to specify locations of cells and paths
 */
interface Position {
    x: number;
    y: number;
}
/**
 * Factory function to create a new Position object
 * @param x - The x-coordinate (horizontal position)
 * @param y - The y-coordinate (vertical position)
 * @returns New Position object with the specified coordinates
 */
declare function createPosition(x: number, y: number): Position;
/**
 * Calculates a new position by moving from current position in a specific direction
 * @param pos - The starting position
 * @param direction - The direction to move
 * @param distance - The number of steps to move (defaults to 1)
 * @returns New Position object representing the destination
 */
declare function movePosition(pos: Position, direction: Direction, distance?: number): Position;
export type { Position };
export { createPosition, movePosition };
//# sourceMappingURL=Position.d.ts.map
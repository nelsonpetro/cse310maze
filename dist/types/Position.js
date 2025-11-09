import { Direction, getDirectionOffset } from "./Direction.js";
/**
 * Factory function to create a new Position object
 * @param x - The x-coordinate (horizontal position)
 * @param y - The y-coordinate (vertical position)
 * @returns New Position object with the specified coordinates
 */
function createPosition(x, y) {
    return { x, y };
}
/**
 * Calculates a new position by moving from current position in a specific direction
 * @param pos - The starting position
 * @param direction - The direction to move
 * @param distance - The number of steps to move (defaults to 1)
 * @returns New Position object representing the destination
 */
function movePosition(pos, direction, distance = 1) {
    const offset = getDirectionOffset(direction);
    return {
        x: pos.x + offset.x * distance,
        y: pos.y + offset.y * distance,
    };
}
export { createPosition, movePosition };
//# sourceMappingURL=Position.js.map
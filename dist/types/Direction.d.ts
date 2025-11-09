/**
 * Enumeration of the four cardinal directions for maze navigation
 * Used throughout the maze system for movement and wall positioning
 */
declare enum Direction {
    Up = "up",
    Down = "down",
    Left = "left",
    Right = "right"
}
/**
 * Array containing all possible directions for iteration purposes
 * Useful for algorithms that need to check all four directions
 */
declare const ALL_DIRECTIONS: Direction[];
/**
 * Converts a direction enum value to coordinate offset values
 * Used for calculating neighbor positions based on movement direction
 * @param direction - The direction to convert to coordinate offset
 * @returns Object with x and y offset values for the given direction
 */
declare function getDirectionOffset(direction: Direction): {
    x: number;
    y: number;
};
export { Direction, ALL_DIRECTIONS, getDirectionOffset };
//# sourceMappingURL=Direction.d.ts.map
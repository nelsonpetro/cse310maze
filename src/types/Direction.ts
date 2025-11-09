/**
 * Enumeration of the four cardinal directions for maze navigation
 * Used throughout the maze system for movement and wall positioning
 */
enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

/**
 * Array containing all possible directions for iteration purposes
 * Useful for algorithms that need to check all four directions
 */
const ALL_DIRECTIONS: Direction[] = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right,
];

/**
 * Converts a direction enum value to coordinate offset values
 * Used for calculating neighbor positions based on movement direction
 * @param direction - The direction to convert to coordinate offset
 * @returns Object with x and y offset values for the given direction
 */
function getDirectionOffset(direction: Direction): { x: number; y: number } {
  switch (direction) {
    case Direction.Up:
      return { x: 0, y: -1 };
    case Direction.Down:
      return { x: 0, y: 1 };
    case Direction.Left:
      return { x: -1, y: 0 };
    case Direction.Right:
      return { x: 1, y: 0 };
  }
}

export { Direction, ALL_DIRECTIONS, getDirectionOffset };

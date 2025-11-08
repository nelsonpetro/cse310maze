enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

const ALL_DIRECTIONS: Direction[] = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right,
];

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

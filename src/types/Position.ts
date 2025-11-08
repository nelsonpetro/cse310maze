import { Direction, getDirectionOffset } from "./Direction.js";

interface Position {
  x: number;
  y: number;
}

function createPosition(x: number, y: number): Position {
  return { x, y };
}

function movePosition(
  pos: Position,
  direction: Direction,
  distance: number = 1
): Position {
  const offset = getDirectionOffset(direction);
  return {
    x: pos.x + offset.x * distance,
    y: pos.y + offset.y * distance,
  };
}

export type { Position };
export { createPosition, movePosition };

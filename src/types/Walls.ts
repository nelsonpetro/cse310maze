import { Direction } from "./Direction.js";

type Walls = {
  [key in Direction]: boolean;
};

function createClosedWalls(): Walls {
  return {
    [Direction.Up]: true,
    [Direction.Down]: true,
    [Direction.Left]: true,
    [Direction.Right]: true,
  };
}

function createOpenWalls(): Walls {
  return {
    [Direction.Up]: false,
    [Direction.Down]: false,
    [Direction.Left]: false,
    [Direction.Right]: false,
  };
}

function hasWall(walls: Walls, direction: Direction): boolean {
  return walls[direction];
}

function removeWall(walls: Walls, direction: Direction): Walls {
  return {
    ...walls,
    [direction]: false,
  };
}

function addWall(walls: Walls, direction: Direction): Walls {
  return {
    ...walls,
    [direction]: true,
  };
}

export type { Walls };
export { createClosedWalls, createOpenWalls, hasWall, removeWall, addWall };

import { Direction } from "./Direction.js";
type Walls = {
    [key in Direction]: boolean;
};
declare function createClosedWalls(): Walls;
declare function createOpenWalls(): Walls;
declare function hasWall(walls: Walls, direction: Direction): boolean;
declare function removeWall(walls: Walls, direction: Direction): Walls;
declare function addWall(walls: Walls, direction: Direction): Walls;
export type { Walls };
export { createClosedWalls, createOpenWalls, hasWall, removeWall, addWall };
//# sourceMappingURL=Walls.d.ts.map
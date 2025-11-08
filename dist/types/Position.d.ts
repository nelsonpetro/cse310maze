import { Direction } from "./Direction.js";
interface Position {
    x: number;
    y: number;
}
declare function createPosition(x: number, y: number): Position;
declare function movePosition(pos: Position, direction: Direction, distance?: number): Position;
export type { Position };
export { createPosition, movePosition };
//# sourceMappingURL=Position.d.ts.map
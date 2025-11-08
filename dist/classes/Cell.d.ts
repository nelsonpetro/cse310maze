import { type Position, type Walls, Direction } from "../types/index.js";
declare class Cell {
    private readonly _position;
    private _walls;
    private _visited;
    constructor(x: number, y: number, walls?: Walls);
    get position(): Position;
    get x(): number;
    get y(): number;
    get visited(): boolean;
    set visited(value: boolean);
    hasWallInDirection(direction: Direction): boolean;
    isOpenInDirection(direction: Direction): boolean;
    getWalledDirections(): Direction[];
    getOpenDirections(): Direction[];
    removeWallMutable(direction: Direction): void;
    addWallMutable(direction: Direction): void;
    getNeighborPosition(direction: Direction): Position;
    manhattanDistanceTo(other: Cell | Position): number;
    isAdjacentTo(other: Cell): boolean;
    reset(): void;
    getWallCount(): number;
    toString(): string;
    static createOpen(x: number, y: number): Cell;
}
export { Cell };
//# sourceMappingURL=Cell.d.ts.map
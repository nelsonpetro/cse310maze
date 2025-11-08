import { type Position, Direction } from "../types/index.js";
import { Cell } from "./Cell.js";
declare class Maze {
    private readonly _width;
    private readonly _height;
    private readonly _grid;
    constructor(width: number, height: number, initializeWalls?: boolean);
    private createGrid;
    get width(): number;
    get height(): number;
    get totalCells(): number;
    get dimensions(): {
        width: number;
        height: number;
    };
    isValidPosition(x: number, y: number): boolean;
    isValidPositionObject(pos: Position): boolean;
    getCell(x: number, y: number): Cell;
    getCellAt(pos: Position): Cell;
    getCellSafe(x: number, y: number): Cell | undefined;
    setCell(x: number, y: number, cell: Cell): void;
    getNeighbors(cell: Cell): Cell[];
    getAccessibleNeighbors(cell: Cell): Cell[];
    getUnvisitedNeighbors(cell: Cell): Cell[];
    getNeighborInDirection(cell: Cell, direction: Direction): Cell | undefined;
    areNeighbors(cell1: Cell, cell2: Cell): boolean;
    getDirectionBetween(from: Cell, to: Cell): Direction;
    arePositionsAdjacent(pos1: Position, pos2: Position): boolean;
    canMoveBetween(from: Position, to: Position): boolean;
    removeWallBetween(cell1: Cell, cell2: Cell): void;
    removeWallBetweenPositions(pos1: Position, pos2: Position): void;
    addWallBetween(cell1: Cell, cell2: Cell): void;
    hasPassageBetween(cell1: Cell, cell2: Cell): boolean;
    getAllCells(): Generator<Cell, void, unknown>;
    getCellsArray(): Cell[];
    getRow(y: number): Generator<Cell, void, unknown>;
    forEachCell(callback: (cell: Cell, x: number, y: number) => void): void;
    resetVisited(): void;
    resetToFullyWalled(): void;
    generateRecursiveBacktracking(startX?: number, startY?: number): void;
    solveDFS(start: Position, end: Position): Position[] | null;
    private dfsRecursive;
    solveBFS(start: Position, end: Position): Position[] | null;
    private reconstructPath;
    getStatistics(): {
        totalCells: number;
        visitedCells: number;
        unvisitedCells: number;
        totalWalls: number;
        removedWalls: number;
        connectivity: number;
    };
    toString(): string;
    toStringWithSolution(solutionPath: Position[], startPos?: Position, endPos?: Position): string;
    toStringWithComparedPaths(path1: Position[], path2: Position[], startPos?: Position, endPos?: Position): string;
    static createOpen(width: number, height: number): Maze;
}
export { Maze };
//# sourceMappingURL=Maze.d.ts.map
import { type Position, Direction } from "../types/index.js";
import { Cell } from "./Cell.js";
declare class Maze {
    private readonly _width;
    private readonly _height;
    private readonly _grid;
    constructor(width: number, height: number, initializeWalls?: boolean);
    /**
     * Creates a 2D grid of cells for the maze
     * @param withWalls - If true, creates cells with all walls present; if false, creates open cells
     * @returns 2D array of Cell objects representing the maze grid
     */
    private createGrid;
    get width(): number;
    get height(): number;
    get totalCells(): number;
    get dimensions(): {
        width: number;
        height: number;
    };
    /**
     * Checks if the given coordinates are within the maze boundaries
     * @param x - The x-coordinate to validate
     * @param y - The y-coordinate to validate
     * @returns True if coordinates are valid, false otherwise
     */
    isValidPosition(x: number, y: number): boolean;
    /**
     * Checks if the given position object is within the maze boundaries
     * @param pos - The position object to validate
     * @returns True if position is valid, false otherwise
     */
    isValidPositionObject(pos: Position): boolean;
    /**
     * Retrieves the cell at the specified coordinates with bounds checking
     * @param x - The x-coordinate of the cell
     * @param y - The y-coordinate of the cell
     * @returns The Cell object at the specified coordinates
     * @throws Error if coordinates are out of bounds
     */
    getCell(x: number, y: number): Cell;
    /**
     * Retrieves the cell at the specified position object
     * @param pos - The position object containing x and y coordinates
     * @returns The Cell object at the specified position
     */
    getCellAt(pos: Position): Cell;
    /**
     * Safely retrieves the cell at specified coordinates without throwing errors
     * @param x - The x-coordinate of the cell
     * @param y - The y-coordinate of the cell
     * @returns The Cell object if coordinates are valid, undefined otherwise
     */
    getCellSafe(x: number, y: number): Cell | undefined;
    /**
     * Sets the cell at the specified coordinates with bounds checking
     * @param x - The x-coordinate where to place the cell
     * @param y - The y-coordinate where to place the cell
     * @param cell - The Cell object to place at the specified coordinates
     * @throws Error if coordinates are out of bounds
     */
    setCell(x: number, y: number, cell: Cell): void;
    /**
     * Gets all neighboring cells (up, down, left, right) regardless of walls
     * Returns all cells that are adjacent to the given cell within maze bounds
     * @param cell - The cell to find neighbors for
     * @returns Array of neighboring cells within the maze boundaries
     */
    getNeighbors(cell: Cell): Cell[];
    /**
     * Gets all neighboring cells that are accessible (no wall between them and the given cell)
     * Only returns neighbors that can be reached by moving through open passages
     * @param cell - The cell to find accessible neighbors for
     * @returns Array of cells that can be accessed without passing through walls
     */
    getAccessibleNeighbors(cell: Cell): Cell[];
    /**
     * Gets all neighboring cells that have not been visited yet
     * Used during maze generation to find cells that can still be explored
     * @param cell - The cell to find unvisited neighbors for
     * @returns Array of neighboring cells with visited flag set to false
     */
    getUnvisitedNeighbors(cell: Cell): Cell[];
    /**
     * Gets the neighboring cell in a specific direction from the given cell
     * @param cell - The cell to find a neighbor for
     * @param direction - The direction to look for a neighbor
     * @returns The neighboring cell in the specified direction, or undefined if out of bounds
     */
    getNeighborInDirection(cell: Cell, direction: Direction): Cell | undefined;
    /**
     * Checks if two cells are adjacent to each other (neighboring)
     * @param cell1 - The first cell
     * @param cell2 - The second cell
     * @returns True if the cells are neighbors, false otherwise
     */
    areNeighbors(cell1: Cell, cell2: Cell): boolean;
    /**
     * Determines the direction from one cell to an adjacent cell
     * @param from - The starting cell
     * @param to - The target cell (must be adjacent to the from cell)
     * @returns The direction from the first cell to the second cell
     * @throws Error if cells are not neighbors
     */
    getDirectionBetween(from: Cell, to: Cell): Direction;
    /**
     * Checks if two positions are adjacent (horizontally or vertically neighboring)
     * @param pos1 - The first position
     * @param pos2 - The second position
     * @returns True if positions are adjacent, false otherwise
     */
    arePositionsAdjacent(pos1: Position, pos2: Position): boolean;
    /**
     * Checks if movement is possible between two adjacent positions (no walls blocking)
     * @param from - The starting position
     * @param to - The destination position
     * @returns True if movement is possible between the positions, false otherwise
     */
    canMoveBetween(from: Position, to: Position): boolean;
    /**
     * Removes the wall between two adjacent cells, creating a passage
     * Updates both cells to remove their respective walls toward each other
     * @param cell1 - The first cell
     * @param cell2 - The second cell (must be adjacent to the first)
     * @throws Error if cells are not neighbors
     */
    removeWallBetween(cell1: Cell, cell2: Cell): void;
    /**
     * Removes the wall between two cells specified by their positions
     * Convenience method that works with Position objects instead of Cell objects
     * @param pos1 - The position of the first cell
     * @param pos2 - The position of the second cell
     */
    removeWallBetweenPositions(pos1: Position, pos2: Position): void;
    addWallBetween(cell1: Cell, cell2: Cell): void;
    hasPassageBetween(cell1: Cell, cell2: Cell): boolean;
    /**
     * Generator function that yields all cells in the maze row by row
     * Provides memory-efficient iteration over all cells in the maze
     * @yields Cell objects from left to right, top to bottom
     */
    getAllCells(): Generator<Cell, void, unknown>;
    /**
     * Returns all cells in the maze as a flat array
     * @returns Array containing all Cell objects in the maze
     */
    getCellsArray(): Cell[];
    getRow(y: number): Generator<Cell, void, unknown>;
    /**
     * Executes a callback function for each cell in the maze
     * Iterates through all cells providing both the cell object and coordinates
     * @param callback - Function to execute for each cell, receives (cell, x, y) parameters
     */
    forEachCell(callback: (cell: Cell, x: number, y: number) => void): void;
    /**
     * Resets the visited state of all cells in the maze
     * Essential for preparing maze for new pathfinding operations
     */
    resetVisited(): void;
    /**
     * Resets the maze to a fully walled state (all cells have all four walls)
     * Useful for regenerating the maze or starting with a clean slate
     */
    resetToFullyWalled(): void;
    generateRecursiveBacktracking(startX?: number, startY?: number): void;
    /**
     * Solves the maze using Depth-First Search (DFS) algorithm with recursion
     * DFS explores as far as possible along each path before backtracking
     * @param start - Starting position in the maze
     * @param end - Target position to reach
     * @returns Array of positions representing the path, or null if no path exists
     */
    solveDFS(start: Position, end: Position): Position[] | null;
    /**
     * Recursive helper function for DFS pathfinding
     * Uses backtracking to explore all possible paths until target is found
     * @param current - Current position being explored
     * @param target - Target position to reach
     * @param path - Array tracking the current path being explored
     * @returns True if path to target is found, false otherwise
     */
    private dfsRecursive;
    /**
     * Solves the maze using Breadth-First Search (BFS) algorithm
     * BFS explores all neighbors at the current depth before moving to the next depth level
     * Guarantees finding the shortest path in terms of number of steps
     * @param start - Starting position in the maze
     * @param end - Target position to reach
     * @returns Array of positions representing the shortest path, or null if no path exists
     */
    solveBFS(start: Position, end: Position): Position[] | null;
    /**
     * Reconstructs the path from BFS search by following parent nodes backward
     * Used by BFS to build the final path from start to target
     * @param targetNode - The final node reached during BFS containing parent chain
     * @returns Array of positions representing the complete path from start to end
     */
    private reconstructPath;
    /**
     * Calculates and returns comprehensive maze statistics
     * Provides metrics about maze structure, connectivity, and current state
     * @returns Object containing various maze metrics including cell counts, wall counts, and connectivity ratio
     */
    getStatistics(): {
        totalCells: number;
        visitedCells: number;
        unvisitedCells: number;
        totalWalls: number;
        removedWalls: number;
        connectivity: number;
    };
    /**
     * Creates a visual string representation of the maze using Unicode characters
     * Shows walls, open passages, and the overall maze structure
     * @returns String representation of the maze that can be printed to console
     */
    toString(): string;
    /**
     * Creates a visual representation of the maze with a solution path highlighted
     * Shows the maze structure with the solution path marked using special characters
     * @param solutionPath - Array of positions representing the solution path
     * @param startPos - Optional starting position to mark with 'S'
     * @param endPos - Optional ending position to mark with 'E'
     * @returns String representation of maze with solution path highlighted
     */
    toStringWithSolution(solutionPath: Position[], startPos?: Position, endPos?: Position): string;
    /**
     * Creates a visual comparison of two different solution paths in the maze
     * Uses different characters to distinguish between the paths and show overlaps
     * @param path1 - First solution path to display
     * @param path2 - Second solution path to display
     * @param startPos - Optional starting position to mark with 'S'
     * @param endPos - Optional ending position to mark with 'E'
     * @returns String representation showing both paths with different markers
     */
    toStringWithComparedPaths(path1: Position[], path2: Position[], startPos?: Position, endPos?: Position): string;
    static createOpen(width: number, height: number): Maze;
}
export { Maze };
//# sourceMappingURL=Maze.d.ts.map
import { type Position, Direction, ALL_DIRECTIONS } from "../types/index.js";
import { Cell } from "./Cell.js";

// Main maze class that handles generation, pathfinding, and visualization
class Maze {
  private readonly _width: number; // Number of columns in the maze
  private readonly _height: number; // Number of rows in the maze
  private readonly _grid: Cell[][]; // 2D array of cells representing the maze

  // Creates a new maze with the specified dimensions
  constructor(width: number, height: number, initializeWalls: boolean = true) {
    // Validate that dimensions are positive integers
    if (!Number.isInteger(width) || width <= 0) {
      throw new Error(`Invalid width: ${width}. Must be positive integer.`);
    }
    if (!Number.isInteger(height) || height <= 0) {
      throw new Error(`Invalid height: ${height}. Must be positive integer.`);
    }
    this._width = width;
    this._height = height;
    this._grid = this.createGrid(initializeWalls);
  }

  /**
   * Creates a 2D grid of cells for the maze
   * @param withWalls - If true, creates cells with all walls present; if false, creates open cells
   * @returns 2D array of Cell objects representing the maze grid
   */
  private createGrid(withWalls: boolean): Cell[][] {
    const grid: Cell[][] = [];
    for (let y = 0; y < this._height; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < this._width; x++) {
        const cell = withWalls ? new Cell(x, y) : Cell.createOpen(x, y);
        row.push(cell);
      }
      grid.push(row);
    }
    return grid;
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  public get totalCells(): number {
    return this._width * this._height;
  }

  public get dimensions(): { width: number; height: number } {
    return { width: this._width, height: this._height };
  }

  /**
   * Checks if the given coordinates are within the maze boundaries
   * @param x - The x-coordinate to validate
   * @param y - The y-coordinate to validate
   * @returns True if coordinates are valid, false otherwise
   */
  public isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this._width && y >= 0 && y < this._height;
  }

  /**
   * Checks if the given position object is within the maze boundaries
   * @param pos - The position object to validate
   * @returns True if position is valid, false otherwise
   */
  public isValidPositionObject(pos: Position): boolean {
    return this.isValidPosition(pos.x, pos.y);
  }

  /**
   * Retrieves the cell at the specified coordinates with bounds checking
   * @param x - The x-coordinate of the cell
   * @param y - The y-coordinate of the cell
   * @returns The Cell object at the specified coordinates
   * @throws Error if coordinates are out of bounds
   */
  public getCell(x: number, y: number): Cell {
    if (!this.isValidPosition(x, y)) {
      throw new Error(
        `Position (${x}, ${y}) is out of bounds. Maze size: ${this._width}x${this._height}`
      );
    }
    return this._grid[y]![x]!;
  }

  /**
   * Retrieves the cell at the specified position object
   * @param pos - The position object containing x and y coordinates
   * @returns The Cell object at the specified position
   */
  public getCellAt(pos: Position): Cell {
    return this.getCell(pos.x, pos.y);
  }

  /**
   * Safely retrieves the cell at specified coordinates without throwing errors
   * @param x - The x-coordinate of the cell
   * @param y - The y-coordinate of the cell
   * @returns The Cell object if coordinates are valid, undefined otherwise
   */
  public getCellSafe(x: number, y: number): Cell | undefined {
    if (!this.isValidPosition(x, y)) {
      return undefined;
    }
    return this._grid[y]![x]!;
  }

  /**
   * Sets the cell at the specified coordinates with bounds checking
   * @param x - The x-coordinate where to place the cell
   * @param y - The y-coordinate where to place the cell
   * @param cell - The Cell object to place at the specified coordinates
   * @throws Error if coordinates are out of bounds
   */
  public setCell(x: number, y: number, cell: Cell): void {
    if (!this.isValidPosition(x, y)) {
      throw new Error(`Cannot set cell at (${x}, ${y}): out of bounds`);
    }
    if (cell.x !== x || cell.y !== y) {
      throw new Error(
        `Cell position (${cell.x}, ${cell.y}) doesn't match target position (${x}, ${y})`
      );
    }
    this._grid[y]![x] = cell;
  }

  /**
   * Gets all neighboring cells (up, down, left, right) regardless of walls
   * Returns all cells that are adjacent to the given cell within maze bounds
   * @param cell - The cell to find neighbors for
   * @returns Array of neighboring cells within the maze boundaries
   */
  public getNeighbors(cell: Cell): Cell[] {
    const neighbors: Cell[] = [];
    for (const direction of ALL_DIRECTIONS) {
      const neighborPos = cell.getNeighborPosition(direction);
      const neighborCell = this.getCellSafe(neighborPos.x, neighborPos.y);
      if (neighborCell) {
        neighbors.push(neighborCell);
      }
    }
    return neighbors;
  }

  /**
   * Gets all neighboring cells that are accessible (no wall between them and the given cell)
   * Only returns neighbors that can be reached by moving through open passages
   * @param cell - The cell to find accessible neighbors for
   * @returns Array of cells that can be accessed without passing through walls
   */
  public getAccessibleNeighbors(cell: Cell): Cell[] {
    const accessibleNeighbors: Cell[] = [];
    for (const direction of cell.getOpenDirections()) {
      const neighborPos = cell.getNeighborPosition(direction);
      const neighborCell = this.getCellSafe(neighborPos.x, neighborPos.y);
      if (neighborCell) {
        accessibleNeighbors.push(neighborCell);
      }
    }
    return accessibleNeighbors;
  }

  /**
   * Gets all neighboring cells that have not been visited yet
   * Used during maze generation to find cells that can still be explored
   * @param cell - The cell to find unvisited neighbors for
   * @returns Array of neighboring cells with visited flag set to false
   */
  public getUnvisitedNeighbors(cell: Cell): Cell[] {
    return this.getNeighbors(cell).filter((neighbor) => !neighbor.visited);
  }

  /**
   * Gets the neighboring cell in a specific direction from the given cell
   * @param cell - The cell to find a neighbor for
   * @param direction - The direction to look for a neighbor
   * @returns The neighboring cell in the specified direction, or undefined if out of bounds
   */
  public getNeighborInDirection(
    cell: Cell,
    direction: Direction
  ): Cell | undefined {
    const neighborPos = cell.getNeighborPosition(direction);
    return this.getCellSafe(neighborPos.x, neighborPos.y);
  }

  /**
   * Checks if two cells are adjacent to each other (neighboring)
   * @param cell1 - The first cell
   * @param cell2 - The second cell
   * @returns True if the cells are neighbors, false otherwise
   */
  public areNeighbors(cell1: Cell, cell2: Cell): boolean {
    return cell1.isAdjacentTo(cell2);
  }

  /**
   * Determines the direction from one cell to an adjacent cell
   * @param from - The starting cell
   * @param to - The target cell (must be adjacent to the from cell)
   * @returns The direction from the first cell to the second cell
   * @throws Error if cells are not neighbors
   */
  public getDirectionBetween(from: Cell, to: Cell): Direction {
    if (!this.areNeighbors(from, to)) {
      throw new Error(
        `Cells (${from.x}, ${from.y}) and (${to.x}, ${to.y}) are not neighbors`
      );
    }

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    if (dx === 1 && dy === 0) return Direction.Right;
    if (dx === -1 && dy === 0) return Direction.Left;
    if (dx === 0 && dy === 1) return Direction.Down;
    if (dx === 0 && dy === -1) return Direction.Up;
    throw new Error(`Invalid direction calculation between cells`);
  }

  /**
   * Checks if two positions are adjacent (horizontally or vertically neighboring)
   * @param pos1 - The first position
   * @param pos2 - The second position
   * @returns True if positions are adjacent, false otherwise
   */
  public arePositionsAdjacent(pos1: Position, pos2: Position): boolean {
    const dx = Math.abs(pos1.x - pos2.x);
    const dy = Math.abs(pos1.y - pos2.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
  }

  /**
   * Checks if movement is possible between two adjacent positions (no walls blocking)
   * @param from - The starting position
   * @param to - The destination position
   * @returns True if movement is possible between the positions, false otherwise
   */
  public canMoveBetween(from: Position, to: Position): boolean {
    if (!this.arePositionsAdjacent(from, to)) {
      return false;
    }
    const fromCell = this.getCellAt(from);
    const toCell = this.getCellAt(to);
    return (
      this.areNeighbors(fromCell, toCell) &&
      !fromCell.hasWallInDirection(this.getDirectionBetween(fromCell, toCell))
    );
  }

  /**
   * Removes the wall between two adjacent cells, creating a passage
   * Updates both cells to remove their respective walls toward each other
   * @param cell1 - The first cell
   * @param cell2 - The second cell (must be adjacent to the first)
   * @throws Error if cells are not neighbors
   */
  public removeWallBetween(cell1: Cell, cell2: Cell): void {
    if (!this.areNeighbors(cell1, cell2)) {
      throw new Error(`Cannot remove wall: cells are not neighbors`);
    }
    const direction1to2 = this.getDirectionBetween(cell1, cell2);
    const direction2to1 = this.getDirectionBetween(cell2, cell1);
    cell1.removeWallMutable(direction1to2);
    cell2.removeWallMutable(direction2to1);
  }

  /**
   * Removes the wall between two cells specified by their positions
   * Convenience method that works with Position objects instead of Cell objects
   * @param pos1 - The position of the first cell
   * @param pos2 - The position of the second cell
   */
  public removeWallBetweenPositions(pos1: Position, pos2: Position): void {
    const cell1 = this.getCellAt(pos1);
    const cell2 = this.getCellAt(pos2);
    this.removeWallBetween(cell1, cell2);
  }

  public addWallBetween(cell1: Cell, cell2: Cell): void {
    if (!this.areNeighbors(cell1, cell2)) {
      throw new Error(`Cannot add wall: cells are not neighbors`);
    }
    const direction1to2 = this.getDirectionBetween(cell1, cell2);
    const direction2to1 = this.getDirectionBetween(cell2, cell1);
    cell1.addWallMutable(direction1to2);
    cell2.addWallMutable(direction2to1);
  }

  public hasPassageBetween(cell1: Cell, cell2: Cell): boolean {
    if (!this.areNeighbors(cell1, cell2)) {
      return false;
    }
    const direction = this.getDirectionBetween(cell1, cell2);
    return cell1.isOpenInDirection(direction);
  }

  /**
   * Generator function that yields all cells in the maze row by row
   * Provides memory-efficient iteration over all cells in the maze
   * @yields Cell objects from left to right, top to bottom
   */
  public *getAllCells(): Generator<Cell, void, unknown> {
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        yield this._grid[y]![x]!;
      }
    }
  }

  /**
   * Returns all cells in the maze as a flat array
   * @returns Array containing all Cell objects in the maze
   */
  public getCellsArray(): Cell[] {
    const cells: Cell[] = [];
    for (const cell of this.getAllCells()) {
      cells.push(cell);
    }
    return cells;
  }

  public *getRow(y: number): Generator<Cell, void, unknown> {
    if (y < 0 || y >= this._height) {
      throw new Error(`Row ${y} is out of bounds`);
    }
    for (let x = 0; x < this._width; x++) {
      yield this._grid[y]![x]!;
    }
  }

  /**
   * Executes a callback function for each cell in the maze
   * Iterates through all cells providing both the cell object and coordinates
   * @param callback - Function to execute for each cell, receives (cell, x, y) parameters
   */
  public forEachCell(
    callback: (cell: Cell, x: number, y: number) => void
  ): void {
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        callback(this._grid[y]![x]!, x, y);
      }
    }
  }

  /**
   * Resets the visited state of all cells in the maze
   * Essential for preparing maze for new pathfinding operations
   */
  public resetVisited(): void {
    for (const cell of this.getAllCells()) {
      cell.reset();
    }
  }

  /**
   * Resets the maze to a fully walled state (all cells have all four walls)
   * Useful for regenerating the maze or starting with a clean slate
   */
  public resetToFullyWalled(): void {
    this.forEachCell((cell, x, y) => {
      const newCell = new Cell(x, y);
      this.setCell(x, y, newCell);
    });
  }
  public generateRecursiveBacktracking(
    startX: number = 0,
    startY: number = 0
  ): void {
    this.resetToFullyWalled(); // Start with all walls in place
    this.resetVisited();
    const stack: Cell[] = []; // Stack for backtracking when stuck
    const startCell = this.getCell(startX, startY);
    startCell.visited = true;
    stack.push(startCell);

    // Continue until all reachable cells have been visited
    while (stack.length > 0) {
      const current = stack[stack.length - 1]!; // Peek at top of stack
      const unvisitedNeighbors = this.getUnvisitedNeighbors(current);

      if (unvisitedNeighbors.length > 0) {
        // Choose a random unvisited neighbor to continue carving
        const randomIndex = Math.floor(
          Math.random() * unvisitedNeighbors.length
        );
        const next = unvisitedNeighbors[randomIndex]!;
        this.removeWallBetween(current, next); // Create passage between cells
        next.visited = true;
        stack.push(next); // Move to the new cell
      } else {
        // No unvisited neighbors, backtrack to previous cell
        stack.pop();
      }
    }
  }

  /**
   * Solves the maze using Depth-First Search (DFS) algorithm with recursion
   * DFS explores as far as possible along each path before backtracking
   * @param start - Starting position in the maze
   * @param end - Target position to reach
   * @returns Array of positions representing the path, or null if no path exists
   */
  public solveDFS(start: Position, end: Position): Position[] | null {
    if (!this.isValidPositionObject(start)) {
      throw new Error(`Invalid start position: (${start.x}, ${start.y})`);
    }
    if (!this.isValidPositionObject(end)) {
      throw new Error(`Invalid end position: (${end.x}, ${end.y})`);
    }
    // Reset all visited flags to ensure clean state for pathfinding
    this.resetVisited();
    const path: Position[] = [];
    if (this.dfsRecursive(start, end, path)) {
      return [...path];
    }
    return null;
  }

  /**
   * Recursive helper function for DFS pathfinding
   * Uses backtracking to explore all possible paths until target is found
   * @param current - Current position being explored
   * @param target - Target position to reach
   * @param path - Array tracking the current path being explored
   * @returns True if path to target is found, false otherwise
   */
  private dfsRecursive(
    current: Position,
    target: Position,
    path: Position[]
  ): boolean {
    // Add current position to the path being explored
    path.push(current);
    const currentCell = this.getCellAt(current);
    currentCell.visited = true;

    // Check if we've reached the target
    if (current.x === target.x && current.y === target.y) {
      return true;
    }

    // Explore all accessible unvisited neighbors
    const accessibleNeighbors = this.getAccessibleNeighbors(currentCell);
    for (const neighbor of accessibleNeighbors) {
      if (!neighbor.visited) {
        if (this.dfsRecursive(neighbor.position, target, path)) {
          return true;
        }
      }
    }

    // Backtrack: remove current position from path if no solution found
    path.pop();
    return false;
  }

  /**
   * Solves the maze using Breadth-First Search (BFS) algorithm
   * BFS explores all neighbors at the current depth before moving to the next depth level
   * Guarantees finding the shortest path in terms of number of steps
   * @param start - Starting position in the maze
   * @param end - Target position to reach
   * @returns Array of positions representing the shortest path, or null if no path exists
   */
  public solveBFS(start: Position, end: Position): Position[] | null {
    if (!this.isValidPositionObject(start)) {
      throw new Error(`Invalid start position: (${start.x}, ${start.y})`);
    }
    if (!this.isValidPositionObject(end)) {
      throw new Error(`Invalid end position: (${end.x}, ${end.y})`);
    }
    // Reset all visited flags to ensure clean state for pathfinding
    this.resetVisited();

    // Define queue node structure to track position and parent for path reconstruction
    interface QueueNode {
      position: Position;
      parent: QueueNode | null;
    }

    const queue: QueueNode[] = [];
    const startNode: QueueNode = { position: start, parent: null };
    queue.push(startNode);
    this.getCellAt(start).visited = true;

    // Process queue until empty or target is found
    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      const current = currentNode.position;

      // Check if we've reached the target
      if (current.x === end.x && current.y === end.y) {
        return this.reconstructPath(currentNode);
      }

      // Add all accessible unvisited neighbors to the queue
      const currentCell = this.getCellAt(current);
      const accessibleNeighbors = this.getAccessibleNeighbors(currentCell);
      for (const neighbor of accessibleNeighbors) {
        if (!neighbor.visited) {
          neighbor.visited = true;
          const neighborNode: QueueNode = {
            position: neighbor.position,
            parent: currentNode,
          };
          queue.push(neighborNode);
        }
      }
    }
    return null;
  }

  /**
   * Reconstructs the path from BFS search by following parent nodes backward
   * Used by BFS to build the final path from start to target
   * @param targetNode - The final node reached during BFS containing parent chain
   * @returns Array of positions representing the complete path from start to end
   */
  private reconstructPath(targetNode: {
    position: Position;
    parent: any;
  }): Position[] {
    const path: Position[] = [];
    let current = targetNode;
    // Trace back through parent nodes to build complete path
    while (current !== null) {
      path.unshift(current.position);
      current = current.parent;
    }
    return path;
  }

  /**
   * Calculates and returns comprehensive maze statistics
   * Provides metrics about maze structure, connectivity, and current state
   * @returns Object containing various maze metrics including cell counts, wall counts, and connectivity ratio
   */
  public getStatistics(): {
    totalCells: number;
    visitedCells: number;
    unvisitedCells: number;
    totalWalls: number;
    removedWalls: number;
    connectivity: number;
  } {
    let visitedCount = 0;
    let totalWalls = 0;
    let removedWalls = 0;

    // Count visited cells and analyze wall structure
    for (const cell of this.getAllCells()) {
      if (cell.visited) {
        visitedCount++;
      }
      const wallCount = cell.getWallCount();
      totalWalls += wallCount;
      removedWalls += 4 - wallCount; // Each cell starts with 4 walls
    }

    return {
      totalCells: this.totalCells,
      visitedCells: visitedCount,
      unvisitedCells: this.totalCells - visitedCount,
      totalWalls,
      removedWalls,
      connectivity: removedWalls / (this.totalCells * 4), // Ratio of removed walls to total possible walls
    };
  }

  /**
   * Creates a visual string representation of the maze using Unicode characters
   * Shows walls, open passages, and the overall maze structure
   * @returns String representation of the maze that can be printed to console
   */
  public toString(): string {
    let result = "";
    result += "┌";
    for (let x = 0; x < this._width; x++) {
      result += "─────┬";
    }
    result = result.slice(0, -1) + "┐\n";
    for (let y = 0; y < this._height; y++) {
      result += "│";
      for (let x = 0; x < this._width; x++) {
        const cell = this._grid[y]![x]!;
        const content = "   ";
        result += ` ${content} `;
        if (cell.hasWallInDirection(Direction.Right)) {
          result += "│";
        } else {
          result += " ";
        }
      }
      result += "\n";
      if (y < this._height - 1) {
        result += "├";
        for (let x = 0; x < this._width; x++) {
          const cell = this._grid[y]![x]!;
          if (cell.hasWallInDirection(Direction.Down)) {
            result += "─────";
          } else {
            result += "     ";
          }
          result += "┼";
        }
        result = result.slice(0, -1) + "┤\n";
      }
    }
    result += "└";
    for (let x = 0; x < this._width; x++) {
      result += "─────┴";
    }
    result = result.slice(0, -1) + "┘";
    return result;
  }

  /**
   * Creates a visual representation of the maze with a solution path highlighted
   * Shows the maze structure with the solution path marked using special characters
   * @param solutionPath - Array of positions representing the solution path
   * @param startPos - Optional starting position to mark with 'S'
   * @param endPos - Optional ending position to mark with 'E'
   * @returns String representation of maze with solution path highlighted
   */
  public toStringWithSolution(
    solutionPath: Position[],
    startPos?: Position,
    endPos?: Position
  ): string {
    const pathSet = new Set<string>();
    for (const pos of solutionPath) {
      pathSet.add(`${pos.x},${pos.y}`);
    }
    let result = "";
    result += "┌";
    for (let x = 0; x < this._width; x++) {
      result += "─────┬";
    }
    result = result.slice(0, -1) + "┐\n";
    for (let y = 0; y < this._height; y++) {
      result += "│";
      for (let x = 0; x < this._width; x++) {
        const cell = this._grid[y]![x]!;
        const posKey = `${x},${y}`;
        let content: string;
        if (startPos && x === startPos.x && y === startPos.y) {
          content = " S ";
        } else if (endPos && x === endPos.x && y === endPos.y) {
          content = " E ";
        } else if (pathSet.has(posKey)) {
          content = " ● ";
        } else if (cell.visited) {
          content = " · ";
        } else {
          content = "   ";
        }
        result += ` ${content} `;
        if (cell.hasWallInDirection(Direction.Right)) {
          result += "│";
        } else {
          result += " ";
        }
      }
      result += "\n";
      if (y < this._height - 1) {
        result += "├";
        for (let x = 0; x < this._width; x++) {
          const cell = this._grid[y]![x]!;
          if (cell.hasWallInDirection(Direction.Down)) {
            result += "─────";
          } else {
            result += "     ";
          }
          result += "┼";
        }
        result = result.slice(0, -1) + "┤\n";
      }
    }
    result += "└";
    for (let x = 0; x < this._width; x++) {
      result += "─────┴";
    }
    result = result.slice(0, -1) + "┘";
    return result;
  }

  /**
   * Creates a visual comparison of two different solution paths in the maze
   * Uses different characters to distinguish between the paths and show overlaps
   * @param path1 - First solution path to display
   * @param path2 - Second solution path to display
   * @param startPos - Optional starting position to mark with 'S'
   * @param endPos - Optional ending position to mark with 'E'
   * @returns String representation showing both paths with different markers
   */
  public toStringWithComparedPaths(
    path1: Position[],
    path2: Position[],
    startPos?: Position,
    endPos?: Position
  ): string {
    const path1Set = new Set<string>();
    const path2Set = new Set<string>();
    for (const pos of path1) {
      path1Set.add(`${pos.x},${pos.y}`);
    }
    for (const pos of path2) {
      path2Set.add(`${pos.x},${pos.y}`);
    }
    let result = "";
    result += "┌";
    for (let x = 0; x < this._width; x++) {
      result += "─────┬";
    }
    result = result.slice(0, -1) + "┐\n";
    for (let y = 0; y < this._height; y++) {
      result += "│";
      for (let x = 0; x < this._width; x++) {
        const posKey = `${x},${y}`;
        let content: string;
        if (startPos && x === startPos.x && y === startPos.y) {
          content = " S ";
        } else if (endPos && x === endPos.x && y === endPos.y) {
          content = " E ";
        } else if (path1Set.has(posKey) && path2Set.has(posKey)) {
          content = " ◆ ";
        } else if (path1Set.has(posKey)) {
          content = " ● ";
        } else if (path2Set.has(posKey)) {
          content = " ○ ";
        } else {
          content = "   ";
        }
        result += ` ${content} `;
        const cell = this._grid[y]![x]!;
        if (cell.hasWallInDirection(Direction.Right)) {
          result += "│";
        } else {
          result += " ";
        }
      }
      result += "\n";
      if (y < this._height - 1) {
        result += "├";
        for (let x = 0; x < this._width; x++) {
          const cell = this._grid[y]![x]!;
          if (cell.hasWallInDirection(Direction.Down)) {
            result += "─────";
          } else {
            result += "     ";
          }
          result += "┼";
        }
        result = result.slice(0, -1) + "┤\n";
      }
    }
    result += "└";
    for (let x = 0; x < this._width; x++) {
      result += "─────┴";
    }
    result = result.slice(0, -1) + "┘";
    return result;
  }

  public static createOpen(width: number, height: number): Maze {
    return new Maze(width, height, false);
  }
}

export { Maze };

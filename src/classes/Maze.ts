import { type Position, Direction, ALL_DIRECTIONS } from "../types/index.js";
import { Cell } from "./Cell.js";

class Maze {
  private readonly _width: number;
  private readonly _height: number;
  private readonly _grid: Cell[][];

  constructor(width: number, height: number, initializeWalls: boolean = true) {
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
  public isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this._width && y >= 0 && y < this._height;
  }
  public isValidPositionObject(pos: Position): boolean {
    return this.isValidPosition(pos.x, pos.y);
  }
  public getCell(x: number, y: number): Cell {
    if (!this.isValidPosition(x, y)) {
      throw new Error(
        `Position (${x}, ${y}) is out of bounds. Maze size: ${this._width}x${this._height}`
      );
    }
    return this._grid[y]![x]!;
  }
  public getCellAt(pos: Position): Cell {
    return this.getCell(pos.x, pos.y);
  }
  public getCellSafe(x: number, y: number): Cell | undefined {
    if (!this.isValidPosition(x, y)) {
      return undefined;
    }
    return this._grid[y]![x]!;
  }
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
  public getUnvisitedNeighbors(cell: Cell): Cell[] {
    return this.getNeighbors(cell).filter((neighbor) => !neighbor.visited);
  }
  public getNeighborInDirection(
    cell: Cell,
    direction: Direction
  ): Cell | undefined {
    const neighborPos = cell.getNeighborPosition(direction);
    return this.getCellSafe(neighborPos.x, neighborPos.y);
  }
  public areNeighbors(cell1: Cell, cell2: Cell): boolean {
    return cell1.isAdjacentTo(cell2);
  }
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
  public arePositionsAdjacent(pos1: Position, pos2: Position): boolean {
    const dx = Math.abs(pos1.x - pos2.x);
    const dy = Math.abs(pos1.y - pos2.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
  }
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
  public removeWallBetween(cell1: Cell, cell2: Cell): void {
    if (!this.areNeighbors(cell1, cell2)) {
      throw new Error(`Cannot remove wall: cells are not neighbors`);
    }
    const direction1to2 = this.getDirectionBetween(cell1, cell2);
    const direction2to1 = this.getDirectionBetween(cell2, cell1);
    cell1.removeWallMutable(direction1to2);
    cell2.removeWallMutable(direction2to1);
  }
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
  public *getAllCells(): Generator<Cell, void, unknown> {
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        yield this._grid[y]![x]!;
      }
    }
  }
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

  public forEachCell(
    callback: (cell: Cell, x: number, y: number) => void
  ): void {
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        callback(this._grid[y]![x]!, x, y);
      }
    }
  }
  public resetVisited(): void {
    for (const cell of this.getAllCells()) {
      cell.reset();
    }
  }
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
    this.resetToFullyWalled();
    this.resetVisited();
    const stack: Cell[] = [];
    const startCell = this.getCell(startX, startY);
    startCell.visited = true;
    stack.push(startCell);
    while (stack.length > 0) {
      const current = stack[stack.length - 1]!;
      const unvisitedNeighbors = this.getUnvisitedNeighbors(current);
      if (unvisitedNeighbors.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * unvisitedNeighbors.length
        );
        const next = unvisitedNeighbors[randomIndex]!;
        this.removeWallBetween(current, next);
        next.visited = true;
        stack.push(next);
      } else {
        stack.pop();
      }
    }
  }

  public solveDFS(start: Position, end: Position): Position[] | null {
    if (!this.isValidPositionObject(start)) {
      throw new Error(`Invalid start position: (${start.x}, ${start.y})`);
    }
    if (!this.isValidPositionObject(end)) {
      throw new Error(`Invalid end position: (${end.x}, ${end.y})`);
    }
    this.resetVisited();
    const path: Position[] = [];
    if (this.dfsRecursive(start, end, path)) {
      return [...path];
    }
    return null;
  }
  private dfsRecursive(
    current: Position,
    target: Position,
    path: Position[]
  ): boolean {
    path.push(current);
    const currentCell = this.getCellAt(current);
    currentCell.visited = true;
    if (current.x === target.x && current.y === target.y) {
      return true;
    }
    const accessibleNeighbors = this.getAccessibleNeighbors(currentCell);
    for (const neighbor of accessibleNeighbors) {
      if (!neighbor.visited) {
        if (this.dfsRecursive(neighbor.position, target, path)) {
          return true;
        }
      }
    }
    path.pop();
    return false;
  }
  public solveBFS(start: Position, end: Position): Position[] | null {
    if (!this.isValidPositionObject(start)) {
      throw new Error(`Invalid start position: (${start.x}, ${start.y})`);
    }
    if (!this.isValidPositionObject(end)) {
      throw new Error(`Invalid end position: (${end.x}, ${end.y})`);
    }
    this.resetVisited();
    interface QueueNode {
      position: Position;
      parent: QueueNode | null;
    }
    const queue: QueueNode[] = [];
    const startNode: QueueNode = { position: start, parent: null };
    queue.push(startNode);
    this.getCellAt(start).visited = true;
    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      const current = currentNode.position;
      if (current.x === end.x && current.y === end.y) {
        return this.reconstructPath(currentNode);
      }
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
  private reconstructPath(targetNode: {
    position: Position;
    parent: any;
  }): Position[] {
    const path: Position[] = [];
    let current = targetNode;
    while (current !== null) {
      path.unshift(current.position);
      current = current.parent;
    }
    return path;
  }

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
    for (const cell of this.getAllCells()) {
      if (cell.visited) {
        visitedCount++;
      }
      const wallCount = cell.getWallCount();
      totalWalls += wallCount;
      removedWalls += 4 - wallCount;
    }
    return {
      totalCells: this.totalCells,
      visitedCells: visitedCount,
      unvisitedCells: this.totalCells - visitedCount,
      totalWalls,
      removedWalls,
      connectivity: removedWalls / (this.totalCells * 4),
    };
  }

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

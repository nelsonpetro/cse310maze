import {
  type Position,
  type Walls,
  Direction,
  createPosition,
  createClosedWalls,
  createOpenWalls,
  hasWall,
  removeWall,
  addWall,
  movePosition,
} from "../types/index.js";

// Represents a single cell in the maze grid with position, walls, and state
class Cell {
  private readonly _position: Position; // Cell's fixed coordinate in the maze
  private _walls: Walls; // Which directions have walls (up, down, left, right)
  private _visited: boolean; // Used for maze generation and pathfinding algorithms

  // Creates a new cell at the specified coordinates with optional wall configuration
  constructor(x: number, y: number, walls?: Walls) {
    // Validate coordinates are non-negative integers
    if (!Number.isInteger(x) || x < 0) {
      throw new Error(
        `Invalid x coordinate: ${x}. Must be non-negative integer.`
      );
    }
    if (!Number.isInteger(y) || y < 0) {
      throw new Error(
        `Invalid y coordinate: ${y}. Must be non-negative integer.`
      );
    }
    this._position = createPosition(x, y);
    this._walls = walls ?? createClosedWalls(); // Default to fully walled cell
    this._visited = false;
  }

  // Returns the cell's position in the maze
  public get position(): Position {
    return this._position;
  }

  // Returns the x coordinate (column) of the cell
  public get x(): number {
    return this._position.x;
  }

  // Returns the y coordinate (row) of the cell
  public get y(): number {
    return this._position.y;
  }

  // Returns whether this cell has been visited during algorithm execution
  public get visited(): boolean {
    return this._visited;
  }

  // Sets the visited state for maze generation and pathfinding algorithms
  public set visited(value: boolean) {
    this._visited = value;
  }

  // Checks if there is a wall in the specified direction
  public hasWallInDirection(direction: Direction): boolean {
    return hasWall(this._walls, direction);
  }

  // Checks if the cell is open (no wall) in the specified direction
  public isOpenInDirection(direction: Direction): boolean {
    return !this.hasWallInDirection(direction);
  }

  // Returns an array of directions where this cell has walls
  public getWalledDirections(): Direction[] {
    return Object.entries(this._walls)
      .filter(([_, hasWall]) => hasWall)
      .map(([direction, _]) => direction as Direction);
  }

  // Returns an array of directions where this cell is open (no walls)
  public getOpenDirections(): Direction[] {
    return Object.entries(this._walls)
      .filter(([_, hasWall]) => !hasWall)
      .map(([direction, _]) => direction as Direction);
  }

  // Removes a wall in the specified direction, modifying this cell
  public removeWallMutable(direction: Direction): void {
    this._walls = removeWall(this._walls, direction);
  }

  // Adds a wall in the specified direction, modifying this cell
  public addWallMutable(direction: Direction): void {
    this._walls = addWall(this._walls, direction);
  }

  // Calculates the position of the neighboring cell in the given direction
  public getNeighborPosition(direction: Direction): Position {
    return movePosition(this._position, direction, 1);
  }

  // Calculates Manhattan distance (grid distance) to another cell or position
  public manhattanDistanceTo(other: Cell | Position): number {
    const otherPos = other instanceof Cell ? other.position : other;
    return Math.abs(this.x - otherPos.x) + Math.abs(this.y - otherPos.y);
  }

  // Checks if another cell is directly adjacent (Manhattan distance of 1)
  public isAdjacentTo(other: Cell): boolean {
    return this.manhattanDistanceTo(other) === 1;
  }

  // Resets the cell's visited state for algorithm re-execution
  public reset(): void {
    this._visited = false;
  }

  // Returns the number of walls surrounding this cell
  public getWallCount(): number {
    return this.getWalledDirections().length;
  }

  // Returns a string representation of the cell for debugging
  public toString(): string {
    const wallCount = this.getWallCount();
    const visitedStatus = this._visited ? "visited" : "unvisited";
    return `Cell(${this.x},${this.y}): ${wallCount} walls, ${visitedStatus}`;
  }

  // Factory method to create a cell with all walls removed
  public static createOpen(x: number, y: number): Cell {
    return new Cell(x, y, createOpenWalls());
  }
}

export { Cell };

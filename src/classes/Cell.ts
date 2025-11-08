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

class Cell {
  private readonly _position: Position;
  private _walls: Walls;
  private _visited: boolean;

  constructor(x: number, y: number, walls?: Walls) {
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
    this._walls = walls ?? createClosedWalls();
    this._visited = false;
  }
  public get position(): Position {
    return this._position;
  }
  public get x(): number {
    return this._position.x;
  }
  public get y(): number {
    return this._position.y;
  }

  public get visited(): boolean {
    return this._visited;
  }
  public set visited(value: boolean) {
    this._visited = value;
  }
  public hasWallInDirection(direction: Direction): boolean {
    return hasWall(this._walls, direction);
  }
  public isOpenInDirection(direction: Direction): boolean {
    return !this.hasWallInDirection(direction);
  }
  public getWalledDirections(): Direction[] {
    return Object.entries(this._walls)
      .filter(([_, hasWall]) => hasWall)
      .map(([direction, _]) => direction as Direction);
  }
  public getOpenDirections(): Direction[] {
    return Object.entries(this._walls)
      .filter(([_, hasWall]) => !hasWall)
      .map(([direction, _]) => direction as Direction);
  }

  public removeWallMutable(direction: Direction): void {
    this._walls = removeWall(this._walls, direction);
  }
  public addWallMutable(direction: Direction): void {
    this._walls = addWall(this._walls, direction);
  }
  public getNeighborPosition(direction: Direction): Position {
    return movePosition(this._position, direction, 1);
  }

  public manhattanDistanceTo(other: Cell | Position): number {
    const otherPos = other instanceof Cell ? other.position : other;
    return Math.abs(this.x - otherPos.x) + Math.abs(this.y - otherPos.y);
  }
  public isAdjacentTo(other: Cell): boolean {
    return this.manhattanDistanceTo(other) === 1;
  }

  public reset(): void {
    this._visited = false;
  }

  public getWallCount(): number {
    return this.getWalledDirections().length;
  }

  public toString(): string {
    const wallCount = this.getWallCount();
    const visitedStatus = this._visited ? "visited" : "unvisited";
    return `Cell(${this.x},${this.y}): ${wallCount} walls, ${visitedStatus}`;
  }

  public static createOpen(x: number, y: number): Cell {
    return new Cell(x, y, createOpenWalls());
  }
}

export { Cell };

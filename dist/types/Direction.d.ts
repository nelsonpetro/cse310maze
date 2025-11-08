declare enum Direction {
    Up = "up",
    Down = "down",
    Left = "left",
    Right = "right"
}
declare const ALL_DIRECTIONS: Direction[];
declare function getDirectionOffset(direction: Direction): {
    x: number;
    y: number;
};
export { Direction, ALL_DIRECTIONS, getDirectionOffset };
//# sourceMappingURL=Direction.d.ts.map
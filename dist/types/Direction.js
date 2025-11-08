var Direction;
(function (Direction) {
    Direction["Up"] = "up";
    Direction["Down"] = "down";
    Direction["Left"] = "left";
    Direction["Right"] = "right";
})(Direction || (Direction = {}));
const ALL_DIRECTIONS = [
    Direction.Up,
    Direction.Down,
    Direction.Left,
    Direction.Right,
];
function getDirectionOffset(direction) {
    switch (direction) {
        case Direction.Up:
            return { x: 0, y: -1 };
        case Direction.Down:
            return { x: 0, y: 1 };
        case Direction.Left:
            return { x: -1, y: 0 };
        case Direction.Right:
            return { x: 1, y: 0 };
    }
}
export { Direction, ALL_DIRECTIONS, getDirectionOffset };
//# sourceMappingURL=Direction.js.map
import { Direction } from "./Direction.js";
function createClosedWalls() {
    return {
        [Direction.Up]: true,
        [Direction.Down]: true,
        [Direction.Left]: true,
        [Direction.Right]: true,
    };
}
function createOpenWalls() {
    return {
        [Direction.Up]: false,
        [Direction.Down]: false,
        [Direction.Left]: false,
        [Direction.Right]: false,
    };
}
function hasWall(walls, direction) {
    return walls[direction];
}
function removeWall(walls, direction) {
    return {
        ...walls,
        [direction]: false,
    };
}
function addWall(walls, direction) {
    return {
        ...walls,
        [direction]: true,
    };
}
export { createClosedWalls, createOpenWalls, hasWall, removeWall, addWall };
//# sourceMappingURL=Walls.js.map
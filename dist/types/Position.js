import { Direction, getDirectionOffset } from "./Direction.js";
function createPosition(x, y) {
    return { x, y };
}
function movePosition(pos, direction, distance = 1) {
    const offset = getDirectionOffset(direction);
    return {
        x: pos.x + offset.x * distance,
        y: pos.y + offset.y * distance,
    };
}
export { createPosition, movePosition };
//# sourceMappingURL=Position.js.map
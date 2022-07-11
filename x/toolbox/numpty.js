export function min(value, min) {
    return value < min
        ? min
        : value;
}
export function max(value, max) {
    return value > max
        ? max
        : value;
}
export function cap(value, min, max) {
    return value < min
        ? min
        : value > max
            ? max
            : value;
}
export function between(value, min, max) {
    const space = max - min;
    const amount = value - min;
    return amount / space;
}
export function withinRange(value, min, max) {
    return value >= min && value <= max;
}
//# sourceMappingURL=numpty.js.map
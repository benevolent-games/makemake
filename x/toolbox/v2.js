import { cap as scalarCap } from "./numpty.js";
export var v2;
(function (v2) {
    function is(v) {
        return v;
    }
    v2.is = is;
    function zero() {
        return [0, 0];
    }
    v2.zero = zero;
    function equal(a, b, ...c) {
        const [x, y] = a;
        for (const d of [b, ...c]) {
            const [x2, y2] = d;
            if (x !== x2 || y !== y2)
                return false;
        }
        return true;
    }
    v2.equal = equal;
    function rotate([x, y], radians) {
        return [
            (x * Math.cos(radians)) - (y * Math.sin(radians)),
            (x * Math.sin(radians)) + (y * Math.cos(radians)),
        ];
    }
    v2.rotate = rotate;
    function dot(a, b) {
        return (a[0] * b[0]) + (a[1] * b[1]);
    }
    v2.dot = dot;
    function distance([x1, y1], [x2, y2]) {
        const x = x1 - x2;
        const y = y1 - y2;
        return Math.sqrt((x * x) + (y * y));
    }
    v2.distance = distance;
    function atan2([ax, ay], [bx, by]) {
        return Math.atan2(by, bx) - Math.atan2(ay, ax);
    }
    v2.atan2 = atan2;
    function magnitude([x, y]) {
        return Math.sqrt(x * x +
            y * y);
    }
    v2.magnitude = magnitude;
    function add([x, y], ...vectors) {
        for (const vector of vectors) {
            x += vector[0];
            y += vector[1];
        }
        return [x, y];
    }
    v2.add = add;
    function multiply(a, b) {
        return [
            a[0] * b[0],
            a[1] * b[1],
        ];
    }
    v2.multiply = multiply;
    function subtract(a, b) {
        return [
            a[0] - b[0],
            a[1] - b[1],
        ];
    }
    v2.subtract = subtract;
    function normalize(vector) {
        const length = magnitude(vector);
        const [x, y] = vector;
        return length === 0
            ? vector
            : [
                x / length,
                y / length,
            ];
    }
    v2.normalize = normalize;
    function applyBy(vector, change) {
        return [
            change(vector[0]),
            change(vector[1]),
        ];
    }
    v2.applyBy = applyBy;
    function cap(vector, min, max) {
        return applyBy(vector, a => scalarCap(a, min, max));
    }
    v2.cap = cap;
    function negate(vector) {
        return applyBy(vector, a => a * -1);
    }
    v2.negate = negate;
    function multiplyBy(vector, factor) {
        return applyBy(vector, a => a * factor);
    }
    v2.multiplyBy = multiplyBy;
    function addBy(vector, amount) {
        return applyBy(vector, a => a + amount);
    }
    v2.addBy = addBy;
})(v2 || (v2 = {}));
//# sourceMappingURL=v2.js.map
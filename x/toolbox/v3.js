import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
export var v3;
(function (v3) {
    function fromBabylon(vector) {
        return [vector.x, vector.y, vector.z];
    }
    v3.fromBabylon = fromBabylon;
    function toBabylon(v) {
        return new Vector3(...v);
    }
    v3.toBabylon = toBabylon;
    function zero() {
        return [0, 0, 0];
    }
    v3.zero = zero;
    function equal(a, b, ...c) {
        const [x, y, z] = a;
        for (const d of [b, ...c]) {
            const [x2, y2, z2] = d;
            if (x !== x2 || y !== y2 || z !== z2)
                return false;
        }
        return true;
    }
    v3.equal = equal;
    function add(...vectors) {
        let x = 0;
        let y = 0;
        let z = 0;
        for (const [vx, vy, vz] of vectors) {
            x += vx;
            y += vy;
            z += vz;
        }
        return [x, y, z];
    }
    v3.add = add;
    function applyBy([x, y, z], action) {
        return [
            action(x),
            action(y),
            action(z),
        ];
    }
    function negate(vector) {
        return applyBy(vector, a => a * -1);
    }
    v3.negate = negate;
    function subtract(a, b) {
        return [
            a[0] - b[0],
            a[1] - b[1],
            a[2] - b[2],
        ];
    }
    v3.subtract = subtract;
    function addBy(vector, delta) {
        return applyBy(vector, a => a + delta);
    }
    v3.addBy = addBy;
    function multiplyBy(vector, delta) {
        return applyBy(vector, a => a * delta);
    }
    v3.multiplyBy = multiplyBy;
    function divideBy(vector, delta) {
        return applyBy(vector, a => delta === 0
            ? a
            : a / delta);
    }
    v3.divideBy = divideBy;
    function magnitude([x, y, z]) {
        return Math.sqrt(x * x +
            y * y +
            z * z);
    }
    v3.magnitude = magnitude;
    function normalize(vector) {
        const length = magnitude(vector);
        const [x, y, z] = vector;
        return length === 0
            ? vector
            : [
                x / length,
                y / length,
                z / length,
            ];
    }
    v3.normalize = normalize;
    // export function normalize([x, y, z]: V3): V3 {
    // 	const magnitudeSquared = (x ** 2) + (y ** 2) + (z ** 2)
    // 	const factor = fastInverseSquareRoot(magnitudeSquared)
    // 	return [
    // 		x * factor,
    // 		y * factor,
    // 		z * factor,
    // 	]
    // }
    function distance([ax, ay, az], [bx, by, bz]) {
        return Math.sqrt(((ax - bx) ** 2) +
            ((ay - by) ** 2) +
            ((az - bz) ** 2));
    }
    v3.distance = distance;
    function dot(a, b) {
        return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]);
    }
    v3.dot = dot;
    function cross(a, b) {
        return [
            (a[1] * b[2]) - (a[2] * b[1]),
            (a[2] * b[0]) - (a[0] * b[2]),
            (a[0] * b[1]) - (a[1] * b[0]),
        ];
    }
    v3.cross = cross;
    function withinCircle([cx, cy, cz], radius, [ax, ay, az]) {
        const distanceSquared = (((ax - cx) ** 2) +
            ((ay - cy) ** 2) +
            ((az - cz) ** 2));
        const radiusSquared = radius ** 2;
        return distanceSquared < radiusSquared;
    }
    v3.withinCircle = withinCircle;
})(v3 || (v3 = {}));
//# sourceMappingURL=v3.js.map
import { Quaternion } from "@babylonjs/core/Maths/math.vector.js";
export var quat;
(function (quat) {
    function zero() {
        return [0, 0, 0, 0];
    }
    quat.zero = zero;
    function toBabylon(q) {
        return new Quaternion(...q);
    }
    quat.toBabylon = toBabylon;
    function fromBabylon({ x, y, z, w }) {
        return [x, y, z, w];
    }
    quat.fromBabylon = fromBabylon;
})(quat || (quat = {}));
//# sourceMappingURL=quat.js.map
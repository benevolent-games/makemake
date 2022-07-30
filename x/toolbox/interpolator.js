import { v3 } from "./v3.js";
import { quat } from "./quat.js";
import { Quaternion } from "@babylonjs/core/Maths/math.vector.js";
export function positionInterpolator(steps) {
    let goalpost = v3.zero();
    return {
        updateGoalpost(position) {
            goalpost = position;
        },
        getCloser(currentPosition) {
            const difference = v3.subtract(goalpost, currentPosition);
            const step = v3.divideBy(difference, steps);
            return v3.add(currentPosition, step);
        },
    };
}
export function rotationInterpolator(steps) {
    let goalpost = quat.zero();
    return {
        updateGoalpost(rotation) {
            goalpost = rotation;
        },
        getCloser(currentRotation) {
            const newRotation = Quaternion.Slerp(quat.toBabylon(currentRotation), quat.toBabylon(goalpost), 1 / steps);
            return quat.fromBabylon(newRotation);
        },
    };
}
export function scalarInterpolator(steps) {
    let goalpost = 0;
    return {
        updateGoalpost(value) {
            goalpost = value;
        },
        getCloser(currentValue) {
            const difference = goalpost - currentValue;
            const step = difference / steps;
            return currentValue + step;
        },
    };
}
//# sourceMappingURL=interpolator.js.map
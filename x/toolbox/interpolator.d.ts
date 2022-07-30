import { v3 } from "./v3.js";
import { quat } from "./quat.js";
export declare function positionInterpolator(steps: number): {
    updateGoalpost(position: v3.V3): void;
    getCloser(currentPosition: v3.V3): v3.V3;
};
export declare function rotationInterpolator(steps: number): {
    updateGoalpost(rotation: quat.Quat): void;
    getCloser(currentRotation: quat.Quat): [number, number, number, number];
};
export declare function scalarInterpolator(steps: number): {
    updateGoalpost(value: number): void;
    getCloser(currentValue: number): number;
};

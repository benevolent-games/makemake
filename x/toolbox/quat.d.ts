import { Quaternion } from "@babylonjs/core/Maths/math.vector.js";
export declare type Quat = quat.Quat;
export declare namespace quat {
    type Quat = [number, number, number, number];
    function zero(): Quat;
    function toBabylon(q: Quat): Quaternion;
    function fromBabylon({ x, y, z, w }: Quaternion): [number, number, number, number];
}

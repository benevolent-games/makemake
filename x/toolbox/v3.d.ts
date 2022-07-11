import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
export declare type V3 = v3.V3;
export declare namespace v3 {
    type V3 = [number, number, number];
    function fromBabylon(vector: Vector3): V3;
    function toBabylon(v: V3): Vector3;
    function zero(): V3;
    function equal(a: V3, b: V3, ...c: V3[]): boolean;
    function add(...vectors: V3[]): V3;
    function negate(vector: V3): V3;
    function subtract(a: V3, b: V3): V3;
    function addBy(vector: V3, delta: number): V3;
    function multiplyBy(vector: V3, delta: number): V3;
    function divideBy(vector: V3, delta: number): V3;
    function magnitude([x, y, z]: V3): number;
    function normalize(vector: V3): V3;
    function distance([ax, ay, az]: V3, [bx, by, bz]: V3): number;
    function dot(a: V3, b: V3): number;
    function cross(a: V3, b: V3): V3;
    function withinCircle([cx, cy, cz]: V3, radius: number, [ax, ay, az]: V3): boolean;
}

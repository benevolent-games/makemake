export declare type V2 = v2.V2;
export declare namespace v2 {
    type V2 = [number, number];
    function is(v: V2): V2;
    function zero(): V2;
    function equal(a: V2, b: V2, ...c: V2[]): boolean;
    function rotate([x, y]: V2, radians: number): V2;
    function dot(a: V2, b: V2): number;
    function distance([x1, y1]: V2, [x2, y2]: V2): number;
    function atan2([ax, ay]: V2, [bx, by]: V2): number;
    function magnitude([x, y]: V2): number;
    function add([x, y]: V2, ...vectors: V2[]): V2;
    function multiply(a: V2, b: V2): V2;
    function subtract(a: V2, b: V2): V2;
    function normalize(vector: V2): V2;
    function applyBy(vector: V2, change: (a: number) => number): V2;
    function cap(vector: V2, min: number, max: number): V2;
    function negate(vector: V2): V2;
    function multiplyBy(vector: V2, factor: number): V2;
    function addBy(vector: V2, amount: number): V2;
}
